package controllers

import (

	"net/http"

	"github.com/gin-gonic/gin"

	"shop/models"
)

func ProdactsPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var input []models.Product
		if err := c.ShouldBindJSON(&input); err != nil {
		  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		  return
		}
	  
		models.UpdateAllProducts(input)
		count := models.ProdactsCount()

		c.JSON(http.StatusOK, gin.H{"data": count})
	}
}

func ProdactsGetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		prodacts, err := models.GetAllProdacts()
		if err != nil {
			c.AbortWithStatus(404)
			return
	   }

		PriceID := c.MustGet("price").(int)

		out := make([]MailProduct, 0, len(prodacts))
		for _, item := range prodacts {
			var price float64
			if PriceID < len(item.Price) && PriceID>=0 {
				price = item.Price[PriceID]
			}
			out = append(out, MailProduct{
				Name: item.Name,
				ID: item.ID,
				Count: 1,
				Unit: item.Unit,
				Price: price,
				ParentID: item.ParentID,
			})
		}

 		c.JSON(http.StatusOK, out)
	}
}
