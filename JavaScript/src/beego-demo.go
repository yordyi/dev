package main

import "github.com/beego/beego/v2/server/web"

type MainController struct {
	web.Controller
}

func (c *MainController) Get() {
	c.Data["json"] = map[string]interface{}{
		"users": []string{"张三", "李四"},
	}
	c.ServeJSON()
}

func main() {
	web.Router("/", &MainController{})
	web.Run()
}
