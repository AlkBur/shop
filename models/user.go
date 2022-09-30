package models

import(
	"shop/globals"
)

type User struct {
	Name    string `json:"name"`
	Email    string `json:"email" gorm:"primaryKey"`
	ID string `json:"id" gorm:"primary_key"`
	Password string `json:"password"`
	PriceID int `json:"price"`
}

func CheckLogin(username string, password string) (int, int) {
	var user User
	globals.DB.Where("email = ?", username).First(&user)

	//PasswordErr = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if user.ID == "" {
		return globals.ERROR_USER_NOT_EXIST, 0
	}
	if user.Password != password {
		return globals.ERROR_PASSWORD_WRONG, 0
	}
	return globals.SUCCSE, user.PriceID
}

func UpdateAllUsers(input []Product) {
	globals.DB.Where("1 = 1").Delete(User{})
	//globals.DB.Delete(&User{})
	for _, user := range input {
		globals.DB.Create(&user)
	}
}

func UsersCount() int64 {
	var count int64
	globals.DB.Model(&User{}).Count(&count)
	return count
}

func GetAllUsers() (users []User, err error) {
	err = globals.DB.Order("name asc").Find(&users).Error
   	return
}