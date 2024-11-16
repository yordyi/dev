package main

import (
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

type Config struct {
	rest.RestConf
	DB struct {
		DataSource string
	}
}

func main() {
	var c Config
	conf.MustLoad("config.yaml", &c)

	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()

	// 数据库连接
	conn := sqlx.NewMysql(c.DB.DataSource)
	
	// 注册路由
	server.AddRoutes([]rest.Route{
		{
			Method:  http.MethodGet,
			Path:    "/api/users",
			Handler: GetUsers(conn),
		},
	})

	server.Start()
} 