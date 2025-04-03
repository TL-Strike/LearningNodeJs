import express from 'express'

let configViewEngine = (app) => {
    app.use(express.static('./src/public')) //cấu hình đường link static, cho biết phía client có thể truy cập vào file nào
    app.set('view engine', 'ejs') //cấu hình view engine là ejs, không dùng html
    app.set('views', './src/views') //cấu hình thư mục chứa các file view
}

module.exports = configViewEngine;