package controllers

import (
	"bytes"
	"fmt"
	"net"
	"crypto/tls"
	"net/mail"
	//"encoding/json"
	"net/http"
	"net/smtp"
	

	"github.com/gin-gonic/gin"

	"shop/models"
	"shop/globals"
)

func ProdactsPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var input []models.Product
		if err := c.ShouldBindJSON(&input); err != nil {
		  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		  return
		}
	  
		//globals.DB.Exec("DELETE FROM Product")
		globals.DB.Where("1 = 1").Delete(models.Product{})
		//globals.DB.Delete(&models.Product{})
		for _, prodact := range input {
			globals.DB.Create(&prodact)
		}

		var count int64
		globals.DB.Model(&models.Product{}).Count(&count)
		c.JSON(http.StatusOK, gin.H{"data": count})
	}
}

func ProdactsGetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var prodacts []models.Product
 		if err := globals.DB.Order("name asc").Find(&prodacts).Error; err != nil {
 		 	c.AbortWithStatus(404)
		 } else {
 		 	c.JSON(http.StatusOK, prodacts)
 		}
	}
}

func MailPostHandler() gin.HandlerFunc {
	return func(c *gin.Context) {	
		
		var input []models.Product
		if err := c.ShouldBindJSON(&input); err != nil {
		  	c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		  	return
		}

		if len(input)==0{
			c.JSON(http.StatusOK, gin.H{
				"status":  globals.SUCCSE,
				"message": "Для отправки письма необходимо выбрать товар",
			})
			return
		}
			
		var TotalCount int 
		for _, item := range input {
			TotalCount += item.Value
		}
		
		var body bytes.Buffer
		if err := globals.EmailTmpl.Execute(&body, gin.H{"Items": input, "TotalCount": TotalCount, "Email": c.MustGet("user").(string)}); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}


		from := mail.Address{"", globals.Email}
		to := mail.Address{"", globals.Email}
		subj := "Оформление заказа от "+ c.MustGet("user").(string)
	
		headers := make(map[string]string)
		headers["From"] = from.String()
		headers["To"] = to.String()
		headers["Subject"] = subj
		
		headers["MIME-version"] = "1.0"
		headers["Content-Type"] = "text/html"
		headers["charset"] = "UTF-8"

		// Setup message
		message := ""
		for k,v := range headers {
			message += fmt.Sprintf("%s: %s\r\n", k, v)
		}
		message += "\r\n" + body.String()
	
		// Connect to the SMTP Server
		servername := "smtp.mail.ru:465"
	
		host, _, _ := net.SplitHostPort(servername)
		auth := smtp.PlainAuth("", globals.EmailLogin, globals.EmailPassword, host)

		// TLS config
		tlsconfig := &tls.Config {
			InsecureSkipVerify: true,
			ServerName: host,
		}

		// Here is the key, you need to call tls.Dial instead of smtp.Dial
		// for smtp servers running on 465 that require an ssl connection
		// from the very beginning (no starttls)
		conn, err := tls.Dial("tcp", servername, tlsconfig)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		client, err := smtp.NewClient(conn, host)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		defer client.Quit()

		// Auth
		if err = client.Auth(auth); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		// To && From
		if err = client.Mail(from.Address); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		if err = client.Rcpt(to.Address); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		// Data
		w, err := client.Data()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		_, err = w.Write([]byte(message))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		err = w.Close()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
	
		c.JSON(http.StatusOK, gin.H{
			"status":  globals.SUCCSE,
			"message": "Письмо отпралено упешно",
		})
	}
}
