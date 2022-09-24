package models

import(
	"shop/globals"
)

type User struct {
	Name    string `json:"name"`
	Email    string `json:"email" gorm:"primaryKey"`
	ID string `json:"id" gorm:"primary_key"`
	Password string `json:"password"`
}

func CheckLogin(username string, password string) int {
	var user User

	globals.DB.Where("email = ?", username).First(&user)

	//PasswordErr = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if user.ID == "" {
		return globals.ERROR_USER_NOT_EXIST
	}
	if user.Password != password {
		return globals.ERROR_PASSWORD_WRONG
	}
	return globals.SUCCSE
}