package models

import "gorm.io/gorm"

// 一对一
type Profile struct {
	gorm.Model
	UserID uint
	User   User
	Bio    string
}

// 一对多
type Post struct {
	gorm.Model
	UserID  uint
	User    User
	Title   string
	Content string
}

// 多对多
type Tag struct {
	gorm.Model
	Name  string
	Posts []Post `gorm:"many2many:post_tags;"`
}
