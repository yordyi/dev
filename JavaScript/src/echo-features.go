package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// 中间件
	e.Use(echo.Logger())
	e.Use(echo.Recover())

	// 路由
	e.GET("/users", getUsers)
	e.POST("/users", createUser)

	// 文件上传
	e.POST("/upload", func(c echo.Context) error {
		file, err := c.FormFile("file")
		if err != nil {
			return err
		}
		return c.SaveUploadedFile(file, "uploaded.txt")
	})

	e.Logger.Fatal(e.Start(":8080"))
}

func getUsers(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]interface{}{
		"users": []string{"张三", "李四"},
	})
}
