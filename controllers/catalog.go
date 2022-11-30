package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"shop/models"
)

func CatalogsPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var input []models.Catalog
		if err := c.ShouldBindJSON(&input); err != nil {
		  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		  return
		}
	  
		models.UpdateAllCatalogs(input)
		count := models.CatalogsCount()

		c.JSON(http.StatusOK, gin.H{"data": count})
	}
}

func CatalogsGetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		catalogs, err := models.GetAllCatalogs()
 		if err != nil {
 		 	c.AbortWithStatus(404)
		 } else {
 		 	c.JSON(http.StatusOK, catalogs)
 		}
	}
}
