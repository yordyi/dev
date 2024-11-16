package main

import (
	"gorm.io/gorm"
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

// 创建
user := User{Name: "张三", Email: "zhangsan@example.com"}
db.Create(&user)

// 查询
var user User
db.First(&user, 1)                // 按主键查找
db.Where("name = ?", "张三").First(&user)  // 条件查询

// 更新
db.Model(&user).Update("name", "李四")    // 更新单个字段
db.Model(&user).Updates(User{Name: "李四", Age: 18})  // 更新多个字段

// 删除
db.Delete(&user) 