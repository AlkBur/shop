package models

import (
	"github.com/lib/pq"

	"shop/globals"
)

type Product struct {
	Name    string `json:"name"`
	ID string `json:"id" gorm:"primary_key"`
	ParentID string `json:"parent_id"`
	Unit string `json:"unit"`
	Price pq.Float64Array `json:"price" gorm:"type:double[]"`
}

func UpdateAllProducts(input []Product) {
	globals.DB.Where("1 = 1").Delete(Product{})
	//globals.DB.Delete(&Product{})
	for _, prodact := range input {
		globals.DB.Create(&prodact)
	}
}

func ProdactsCount() int64 {
	var count int64
	globals.DB.Model(&Product{}).Count(&count)
	return count
}

func GetAllProdacts() (prodacts []Product, err error) {
 	err = globals.DB.Order("name asc").Find(&prodacts).Error
	return
}