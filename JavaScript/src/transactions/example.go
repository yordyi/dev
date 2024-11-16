package main

import (
	"gorm.io/gorm"
)

// 事务示例
tx := db.Begin()
if err := tx.Create(&user).Error; err != nil {
	tx.Rollback()
	return err
}

if err := tx.Create(&post).Error; err != nil {
	tx.Rollback()
	return err
}

tx.Commit() 