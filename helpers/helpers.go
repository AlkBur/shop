package helpers

import (
	"strings"

	"shop/globals"
)

func CheckLogin(username, password string) int {
	if username==globals.AdminLogin {
		if password==globals.AdminPassword {
			return globals.SUCCSE
		} else {
			return globals.ERROR_PASSWORD_WRONG
		}
	} else {
		return globals.ERROR_USER_NOT_EXIST
	}
}

func EmptyUserPass(username, password string) bool {
	return strings.Trim(username, " ") == "" || strings.Trim(password, " ") == ""
}