package models

import(
	"shop/globals"
)

type User struct {
	Name    string `json:"name" gorm:"primaryKey"`
	Email    string `json:"email"`
	ID string `json:"id"`
	Password string `json:"password"`
	PriceID int `json:"price"`
}

func CheckLogin(username string, password string) (int, int, string, string) {
	var user User
	//globals.Log.Printf("find name: %v; password: %v\n", username, password)

	globals.DB.Where("name = ?", username).First(&user)

	//PasswordErr = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if user.ID == "" {
		return globals.ERROR_USER_NOT_EXIST, 0, "", ""
	}
	if user.Password != password {
		return globals.ERROR_PASSWORD_WRONG, 0, "", ""
	}
	return globals.SUCCSE, user.PriceID, user.Email, user.ID
}

func UpdateAllUsers(input []User) {
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