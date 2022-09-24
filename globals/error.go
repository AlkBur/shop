package globals

const (
	SUCCSE = 200
	ERROR  = 500

	ERROR_USERNAME_USED    = 1001
	ERROR_PASSWORD_WRONG   = 1002
	ERROR_USER_NOT_EXIST   = 1003
	ERROR_TOKEN_EXIST      = 1004
	ERROR_TOKEN_RUNTIME    = 1005
	ERROR_TOKEN_WRONG      = 1006
	ERROR_TOKEN_TYPE_WRONG = 1007
	ERROR_USER_NO_RIGHT    = 1008

	ERROR_GOOD_NOT_EXIST = 2001
)

var codeMsg = map[int]string{
	SUCCSE:                 "OK",
	ERROR:                  "FAIL",
	ERROR_USERNAME_USED:    "Имя пользователя уже существует!",
	ERROR_PASSWORD_WRONG:   "Неверный пароль",
	ERROR_USER_NOT_EXIST:   "Пользователь не существует",
	ERROR_TOKEN_EXIST:      "ТОКЕН не существует, пожалуйста, войдите в систему еще раз",
	ERROR_TOKEN_RUNTIME:    "Срок действия ТОКЕНА истек, пожалуйста, войдите в систему еще раз",
	ERROR_TOKEN_WRONG:      "ТОКЕН неверен, пожалуйста, войдите в систему еще раз",
	ERROR_TOKEN_TYPE_WRONG: "Неправильный формат токена, пожалуйста, войдите в систему еще раз",
	ERROR_USER_NO_RIGHT:    "У пользователя нет никаких разрешений",

	ERROR_GOOD_NOT_EXIST: "Этого товара не существует",
}

func GetErrMsg(code int) string {
	return codeMsg[code]
}