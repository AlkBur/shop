package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"shop/models"
)

func UsersPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var input []models.User
		if err := c.ShouldBindJSON(&input); err != nil {
		  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		  return
		}
	  
		models.UpdateAllUsers(input)
		count := models.UsersCount()
		c.JSON(http.StatusOK, gin.H{"data": count})
	}
}