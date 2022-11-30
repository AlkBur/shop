package models

import (
	"time"
	"database/sql"
	"path/filepath"

	"gorm.io/gorm"
	"gorm.io/driver/sqlite"

	"shop/globals"
)

func Init() (*sql.DB, error) {
	db, err := gorm.Open(sqlite.Open(filepath.Join(globals.Path_dir, "base.db")), &gorm.Config{})
	if err != nil {
        return nil, err
    }

	// Auto Migrate
	db.AutoMigrate(&User{}, &Product{}, &Catalog{})
	
	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(10 * time.Second)

	globals.DB = db

	return sqlDB, nil
}