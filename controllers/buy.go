package controllers

import (
	"bytes"
	"math"
	"net/http"

	

	"github.com/gin-gonic/gin"
	gomail "gopkg.in/gomail.v2"

	"shop/globals"
)

type MailProduct struct {
	Name    string `json:"name"`
	ID string `json:"id"`
	Count int `json:"count"`
	Unit string `json:"unit"`
	Price float64 `json:"price"`
	ParentID string `json:"parent_id"`
}

type MailData struct{
	Prodacts []MailProduct `json:"prodacts"`
	Comment string `json:"comment"`
}

func MailPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var in MailData
		if err := c.ShouldBindJSON(&in); err != nil {
		  	c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		  	return
		}

		if len(in.Prodacts)==0{
			c.JSON(http.StatusOK, gin.H{
				"status":  globals.SUCCSE,
				"message": "Для отправки письма необходимо выбрать товар",
			})
			return
		}
			
		var TotalCount int 
		var TotalAmount float64 
		for _, item := range in.Prodacts {
			TotalCount += item.Count
			TotalAmount += math.Round(float64(item.Count) * item.Price * 100) / 100
		}
		
		var body bytes.Buffer
		if err := globals.EmailTmpl.Execute(&body, gin.H{
				"Items": in.Prodacts, 
				"TotalCount": TotalCount, 
				"TotalAmount": TotalAmount, 
				"Email": c.MustGet("user").(string),
				"Comment": in.Comment,
			}); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		m := gomail.NewMessage()
		m.SetHeader("From", globals.Email)
		m.SetHeader("To", globals.Email)

		cc := c.MustGet("email").(string)
		if cc != ""{
			//m.SetAddressHeader("Cc", cc, "Client")
			//globals.Log.Println("cc:", cc)
			m.SetHeader("To", globals.Email, cc)
		}else{
			m.SetHeader("To", globals.Email)
		}
		

		m.SetHeader("Subject", "Оформление заказа от "+ c.MustGet("user").(string))
		m.SetBody("text/html", body.String())
	
		d := gomail.NewDialer("smtp.mail.ru", 465, globals.EmailLogin, globals.EmailPassword)
	
		// Send the email to Bob, Cora and Dan.
		if err := d.DialAndSend(m); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		  	return
		}
	
		c.JSON(http.StatusOK, gin.H{
			"status":  globals.SUCCSE,
			"message": "Письмо отпралено упешно",
		})
	}
}


