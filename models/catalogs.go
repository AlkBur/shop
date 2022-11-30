package models

import (
	"shop/globals"
)

type Catalog struct {
	Name    string `json:"name"`
	ID string `json:"id" gorm:"primary_key"`
	ParentID string `json:"parent_id"`
}

func UpdateAllCatalogs(input []Catalog) {
	globals.DB.Where("1 = 1").Delete(Catalog{})
	for _, catalog := range input {
		globals.DB.Create(&catalog)
	}
}

func CatalogsCount() int64 {
	var count int64
	globals.DB.Model(&Catalog{}).Count(&count)
	return count
}

func GetAllCatalogs() (catalogs []Catalog, err error) {
 	err = globals.DB.Order("name asc").Find(&catalogs).Error
	return
}