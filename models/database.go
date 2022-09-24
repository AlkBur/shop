package models

import (
	"time"
	"database/sql"

	"gorm.io/gorm"
	"gorm.io/driver/sqlite"

	"shop/globals"
)

func Init() (*sql.DB, error) {
	db, err := gorm.Open(sqlite.Open("base.db"), &gorm.Config{})
	if err != nil {
        return nil, err
    }

	// Auto Migrate
	db.AutoMigrate(&User{}, &Product{})
	
	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(10 * time.Second)

	globals.DB = db

	return sqlDB, nil
}