package main

import "github.com/gofiber/fiber/v2"

func main() {
	app := fiber.New()

	// 中间件
	app.Use(logger())

	// 路由
	app.Get("/api/users", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"users": []string{"张三", "李四"},
		})
	})

	app.Listen(":3000")
}
