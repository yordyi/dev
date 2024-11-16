package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// 模型定义
type User struct {
	gorm.Model
	Name  string `json:"name"`
	Email string `json:"email" gorm:"unique"`
}

func main() {
	// 连接数据库
	dsn := "host=localhost user=postgres password=your_password dbname=myapp port=5432"
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	// 自动迁移
	db.AutoMigrate(&User{})

	// 初始化 Gin
	r := gin.Default()

	// CORS 中间件
	r.Use(cors.Default())

	// API 路由
	api := r.Group("/api")
	{
		api.GET("/users", getUsers(db))
		api.POST("/users", createUser(db))
	}

	r.Run(":8080")
}

// 处理函数
func getUsers(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []User
		db.Find(&users)
		c.JSON(200, users)
	}
}
