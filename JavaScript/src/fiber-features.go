package main

import "github.com/gofiber/fiber/v2"

func main() {
	app := fiber.New()

	// 中间件
	app.Use(logger())

	// 静态文件
	app.Static("/", "./public")

	// 路由组
	api := app.Group("/api")
	api.Get("/users", getUsers)
	api.Post("/users", createUser)

	app.Listen(":3000")
}

func getUsers(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"users": []string{"张三", "李四"},
	})
}

func createUser(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "用户创建成功",
	})
}
