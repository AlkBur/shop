package globals

import (
	"html/template"
	"log"
	"gorm.io/gorm"
 )

var (
	Log *log.Logger
	DB *gorm.DB
	Email = "test@mail.ru"
	EmailLogin = "test"
	EmailPassword = "test"
	JwtSecret = "secret_for_jwt"
	AdminLogin = "admin@mail.ru"
	AdminPassword = "admin"
	IsDebug = true

	EmailTmpl = template.Must(template.ParseFiles("templates/email.html"))
)   