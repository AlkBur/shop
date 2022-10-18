package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/dgrijalva/jwt-go"

	"shop/globals"
)

var (
	TokenExpired     = errors.New("Истек срок действия токена, пожалуйста, войдите в систему снова")
	TokenNotValidYet = errors.New("Токен недействителен, пожалуйста, войдите в систему еще раз")
	TokenMalformed   = errors.New("Неверный токен, пожалуйста, войдите в систему еще раз")
	TokenInvalid     = errors.New("Ошибочный токен, пожалуйста, войдите в систему еще раз")
)

type JWT struct {
	JwtKey []byte
}

func NewJWT() *JWT {
	return &JWT{
		[]byte(globals.JwtSecret),
	}
}

type MyClaims struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Price int `json:"price"`

	jwt.StandardClaims
}

func (j *JWT) CreateToken(claims MyClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(j.JwtKey)
}

func (j *JWT) ParserToken(tokenString string) (*MyClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &MyClaims{}, func(token *jwt.Token) (interface{}, error) {
		return j.JwtKey, nil
	})

	if err != nil {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return nil, TokenMalformed
			} else if ve.Errors&jwt.ValidationErrorExpired != 0 {
				return nil, TokenExpired
			} else if ve.Errors&jwt.ValidationErrorNotValidYet != 0 {
				return nil, TokenNotValidYet
			} else {
				return nil, TokenInvalid
			}
		}
	}

	if token != nil {
		if claims, ok := token.Claims.(*MyClaims); ok && token.Valid {
			return claims, nil
		}
		return nil, TokenInvalid
	}

	return nil, TokenInvalid
}


func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code int
		tokenHeader := c.Request.Header.Get("Authorization")
		if tokenHeader == "" {
			code = globals.ERROR_TOKEN_EXIST
			c.JSON(http.StatusOK, gin.H{
				"status":  code,
				"message": globals.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		checkToken := strings.Split(tokenHeader, " ")
		if len(checkToken) == 0 {
			c.JSON(http.StatusOK, gin.H{
				"status":  code,
				"message": globals.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		if len(checkToken) != 2 || checkToken[0] != "Bearer" {
			c.JSON(http.StatusOK, gin.H{
				"status":  code,
				"message": globals.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		j := NewJWT()
		claims, err := j.ParserToken(checkToken[1])
		if err != nil {
			if err == TokenExpired {
				c.JSON(http.StatusOK, gin.H{
					"status":  globals.ERROR,
					"message": "Время токена истекло",
					"data":    nil,
				})
				c.Abort()
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"status":  globals.ERROR,
				"message": err.Error(),
				"data":    nil,
			})
			c.Abort()
			return
		}

		c.Set("user", claims.Name)
		c.Set("email", claims.Email)
		c.Set("price", claims.Price)
		c.Next()
	}
}
