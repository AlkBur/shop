package routes

import (
	"github.com/gin-gonic/gin"

	controllers "shop/controllers"
)

func PublicRoutes(g *gin.RouterGroup) {

	//g.GET("/login", controllers.LoginGetHandler())
	g.POST("/login", controllers.LoginPostHandler())
	g.GET("/", controllers.IndexGetHandler())

}

func PrivateRoutes(g *gin.RouterGroup) {
	g.GET("/prodacts", controllers.ProdactsGetHandler())
	g.POST("/prodacts", controllers.ProdactsPostHandler())
	
	g.POST("/users", controllers.UsersPostHandler())
	
	g.POST("/buy", controllers.MailPostHandler())

	g.GET("/catalogs", controllers.CatalogsGetHandler())
	g.POST("/catalogs", controllers.CatalogsPostHandler())
}