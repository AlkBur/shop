package models

type Product struct {
	Name    string `json:"name"`
	ID string `json:"id" gorm:"primary_key"`
	Value int `json:"value"`
}