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

	e.Logger.Fatal(e.Start(":8080"))
}

func getUsers(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]interface{}{
		"users": []string{"张三", "李四"},
	})
}
