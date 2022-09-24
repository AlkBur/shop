package main

import (
	"log"
	"os"
	"strconv"
	"path/filepath"
	"html/template"
	//"io"

	//"github.com/gin-contrib/sessions"
	//"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	//"html/template"
	//"strings"

	globals "shop/globals"
	middleware "shop/middleware"
	routes "shop/routes"
	models "shop/models"
)

func main() {
	globals.Log = log.New(os.Stdout, "Shop ", log.Lshortfile)

	ex, err := os.Executable()
    if err != nil {
        globals.Log.Fatal(err)
    }
    globals.Path_dir = filepath.Dir(ex)

	globals.EmailTmpl = template.Must(template.ParseFiles(filepath.Join(globals.Path_dir, "templates/email.html")))

	err = godotenv.Load(filepath.Join(globals.Path_dir, ".env"))
	if err != nil {
		globals.Log.Fatal("Error loading .env file")
	}
	globals.IsDebug,_ = strconv.ParseBool(os.Getenv("DEBUG_MODE"))
	globals.JwtSecret = os.Getenv("SECRET_KEY")
	globals.Email = os.Getenv("EMAIL")
	globals.EmailLogin = os.Getenv("EMAIL_LOGIN")
	globals.EmailPassword = os.Getenv("EMAIL_PASSWORD")
	globals.AdminLogin = os.Getenv("ADMIN_LOGIN")
	globals.AdminPassword = os.Getenv("ADMIN_PASSWORD")


	sqlDB, err := models.Init()
	if err != nil {
		globals.Log.Fatalf("Cannot open db, err: %v", err)
	}
	defer sqlDB.Close()

	if !globals.IsDebug {
		gin.SetMode(gin.ReleaseMode)
		//gin.DisableConsoleColor()

		// //Logging to a file.
		// f, err := os.OpenFile("./gin.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)

		// if err != nil {
		// 	log.Printf("error opening file: %v", err)
		// 	os.Exit(1)
		// }
		// gin.DefaultWriter = io.MultiWriter(f)
	}

	router := gin.Default()
	router.Use(middleware.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.Cors())

	maxEventsPerSec := 100
	maxBurstSize := 20
	router.Use(middleware.NewRateLimiter(maxEventsPerSec, maxBurstSize))

	router.StaticFile("/favicon.ico", filepath.Join(globals.Path_dir, "assets/favicon.ico"))
	router.Static("/assets", filepath.Join(globals.Path_dir, "assets"))
	//router.LoadHTMLGlob("templates/*.html")
	router.LoadHTMLGlob(filepath.Join(globals.Path_dir, "templates/index.html"))
	//router.LoadHTMLGlob("templates/email.html")

	//router.Use(sessions.Sessions("session", cookie.NewStore(globals.Secret)))

	public := router.Group("/")
	routes.PublicRoutes(public)

	private := router.Group("/api")
	private.Use(middleware.JWTAuth())
	routes.PrivateRoutes(private)

	log.Printf("[info] start http server listening %s", "8080")
	router.Run(":8080")
}