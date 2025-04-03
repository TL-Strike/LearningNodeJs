import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js'; //import kết nối database
require('dotenv').config(); //sử dụng dotenv để lấy các biến môi trường từ file .env


let app = express(); //tạo một ứng dụng express mới
// config app 

app.use(bodyParser.json()); //cấu hình body-parser để parse dữ liệu json từ client gửi lên
app.use(bodyParser.urlencoded({ extended: true })); //cấu hình body-parser để parse dữ liệu urlencoded từ client gửi lên


viewEngine(app); //cấu hình view engine cho ứng dụng
initWebRoutes(app); //khởi tạo các đường dẫn cho ứng dụng

connectDB(); //kết nối database


let port = process.env.PORT || 6969; //cấu hình port cho ứng dụng, nếu không có port thì sử dụng port 6969

app.listen(port, () => { //
    //callback function
    console.log("Backend Nodejs is running on the port: " + port); //in ra thông báo khi ứng dụng chạy thành công
})