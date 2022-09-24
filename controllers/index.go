package controllers

import (
// 	"github.com/gin-contrib/sessions"

	"net/http"

 	"github.com/gin-gonic/gin"

// 	globals "shop/globals"
// 	models "shop/models"
)

func IndexGetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		//session := sessions.Default(c)
		//user := session.Get(globals.Userkey)
		// if user != nil {
		// 	//c.Redirect(http.StatusMovedPermanently, "/dashboard")
		// }else{
			// c.HTML(http.StatusOK, "index.html", gin.H{
			// 	"content": "This is an index page...",
			// 	"user":    user,
			// })
			c.HTML(http.StatusOK, "index.html", gin.H{})
		//}
	}
}

// func DashboardGetHandler() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		session := sessions.Default(c)
// 		user := session.Get(globals.Userkey)

// 		var prodacts []models.Product
// 		if err := globals.DB.Find(&prodacts).Error; err != nil {
// 			globals.Log.Printf("Error find: %v", err)
// 		// 	c.AbortWithStatus(404)
// 		// 	fmt.Println(err)
// 		// } else {
// 		// 	c.JSON(200, people)
// 		}


// 		c.HTML(http.StatusOK, "dashboard.html", gin.H{
// 			"content": "This is a dashboard",
// 			"user":    user,
// 			"prodacts": prodacts,
// 		})
// 	}
// }