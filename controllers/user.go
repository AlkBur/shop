package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"shop/models"
	"shop/globals"
)

func UsersPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var input []models.User
		if err := c.ShouldBindJSON(&input); err != nil {
		  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		  return
		}
	  
		globals.DB.Where("1 = 1").Delete(models.User{})
		//globals.DB.Delete(&models.Product{})
		for _, user := range input {
			globals.DB.Create(&user)
		}

		var count int64
		globals.DB.Model(&models.User{}).Count(&count)
		c.JSON(http.StatusOK, gin.H{"data": count})
	}
}