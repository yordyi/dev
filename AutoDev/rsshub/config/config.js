module.exports = {
    // 覆盖默认配置
    // 例如：
    // pixiv: {
    //   username: 'your_pixiv_username',
    //   password: 'your_pixiv_password',
    // },
    telegram: {
        apiRoot: 'https://api.telegram.org',
        debug: true,
        // 如果您使用代理，可以在这里配置
        // proxy: 'socks5h://127.0.0.1:1080'
    },
    feature: {
        allow_user_supply_unsafe_domain: true,
    },
    debugInfo: true,
    loggerLevel: 'debug',
    twitter: {
        debug: true,
    },
};
