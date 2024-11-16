package models

import "gorm.io/gorm"

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