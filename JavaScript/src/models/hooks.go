package models

import (
	"gorm.io/gorm"
	"strings"
)

// 定义模型
type User struct {
	gorm.Model               // 内嵌默认字段 (ID, CreatedAt, UpdatedAt, DeletedAt)
	Name      string         `json:"name"`
	Email     string         `json:"email" gorm:"unique"`
	Age       uint           `json:"age"`
	Profile   Profile        // 一对一关系
	Posts     []Post         // 一对多关系
}

// 自动创建表
db.AutoMigrate(&User{})

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	// 创建记录前的处理
	u.Name = strings.TrimSpace(u.Name)
	return
}

func (u *User) AfterCreate(tx *gorm.DB) (err error) {
	// 创建记录后的处理
	return
} 