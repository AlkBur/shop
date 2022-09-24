package controllers

import (
	//"log"
	//"github.com/gin-contrib/sessions"

	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/dgrijalva/jwt-go"

	globals "shop/globals"
	helpers "shop/helpers"
	models "shop/models"
	middleware "shop/middleware"
)

type UserJSON struct {
	Email string `json:"email"`
	Password string `json:"password"`
	IsAdmin bool `json:"admin"`
}

// func LoginGetHandler() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		session := sessions.Default(c)
// 		user := session.Get(globals.Userkey)
// 		if user != nil {
// 			c.HTML(http.StatusBadRequest, "login.html",
// 				gin.H{
// 					"content": "Please logout first",
// 					"user":    user,
// 				})
// 			return
// 		}
// 		c.HTML(http.StatusOK, "login.html", gin.H{
// 			"content": "",
// 			"user":    user,
// 		})
// 	}
// }

func LoginPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
	// 	session := sessions.Default(c)
	// 	user := session.Get(globals.Userkey)
	// 	if user != nil {
	// 		c.HTML(http.StatusBadRequest, "login.html", gin.H{"content": "Please logout first"})
	// 		return
	// 	}

	// 	username := c.PostForm("email")
	// 	password := c.PostForm("password")

	// 	if helpers.EmptyUserPass(username, password) {
	// 		c.HTML(http.StatusBadRequest, "login.html", gin.H{"content": "Parameters can't be empty"})
	// 		return
	// 	}

	// 	if !helpers.CheckUserPass(username, password) {
	// 		c.HTML(http.StatusUnauthorized, "login.html", gin.H{"content": "Incorrect username or password"})
	// 		return
	// 	}

	// 	session.Set(globals.Userkey, username)
	// 	if err := session.Save(); err != nil {
	// 		c.HTML(http.StatusInternalServerError, "login.html", gin.H{"content": "Failed to save session"})
	// 		return
	// 	}

	// 	c.Redirect(http.StatusMovedPermanently, "/dashboard")

		var user UserJSON
		_ = c.ShouldBindJSON(&user)

		globals.Log.Printf("user: %v", user)

		if helpers.EmptyUserPass(user.Email, user.Password) {
			c.JSON(http.StatusOK, gin.H{
				"status":  globals.ERROR_USER_NOT_EXIST,
				"message": globals.GetErrMsg(globals.ERROR_USER_NOT_EXIST),
				"token":   "",
			})
	 		return
		}
		
		var code int
		if user.IsAdmin{
			code = helpers.CheckLogin(user.Email, user.Password)
		}else{
			code = models.CheckLogin(user.Email, user.Password)
		}

		if code == globals.SUCCSE {
			setToken(c, &user)
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status":  code,
				"data":    user.Email,
				"message": globals.GetErrMsg(code),
				"token":   "",
			})
		}
	}
}

func setToken(c *gin.Context, user *UserJSON) {
	j := middleware.NewJWT()
	claims := middleware.MyClaims{
		Email: user.Email,
		StandardClaims: jwt.StandardClaims{
			NotBefore: time.Now().Unix() - 100,
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			Issuer:    "Shop",
		},
	}

	token, err := j.CreateToken(claims)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status":  globals.ERROR,
			"message": globals.GetErrMsg(globals.ERROR),
			"token":   token,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  200,
		"data":    user.Email,
		"message": globals.GetErrMsg(200),
		"token":   token,
	})
	return
}