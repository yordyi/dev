package main

import (
	"entgo.io/ent/dialect/sql"
	"github.com/gofiber/fiber/v2"
)

func main() {
	// 初始化 Ent 客户端
	client := ent.NewClient(ent.Driver(sql.Open("postgres", "postgresql://...")))
	defer client.Close()

	app := fiber.New()

	// API 路由
	api := app.Group("/api")
	api.Get("/users", func(c *fiber.Ctx) error {
		users, err := client.User.Query().All(c.Context())
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		return c.JSON(users)
	})

	app.Listen(":3000")
}
