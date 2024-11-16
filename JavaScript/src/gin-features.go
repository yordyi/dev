package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    // 中间件
    r.Use(gin.Logger())
    r.Use(gin.Recovery())

    // 路由
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })

    // 路由组
    api := r.Group("/api")
    {
        api.GET("/users", getUsers)
        api.POST("/users", createUser)
    }

    // 参数获取
    r.GET("/user/:id", func(c *gin.Context) {
        id := c.Param("id")
        name := c.Query("name")
        c.JSON(200, gin.H{"id": id, "name": name})
    })

    // 中间件
    func AuthMiddleware() gin.HandlerFunc {
        return func(c *gin.Context) {
            // 验证逻辑
            c.Next()
        }
    }

    r.Run(":8080")
}

func getUsers(c *gin.Context) {
    c.JSON(200, gin.H{
        "users": []string{"张三", "李四"},
    })
}