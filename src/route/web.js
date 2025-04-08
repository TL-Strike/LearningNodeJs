//nơi mỗi lần truy cập vào một đường link thì sẽ chạy vào file này đầu tiên
import express from 'express'
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'; //import controller để xử lý các yêu cầu từ client

let router = express.Router(); //tạo một router mới, router này sẽ chứa các đường dẫn của ứng dụng

let initWebRoutes = (app) => { //đường dẫn này sẽ được sử dụng để khởi tạo các đường dẫn của ứng dụng
    router.get('/', homeController.getHomePage); //trả về một chuỗi 'Hello World' khi truy cập vào đường dẫn '/'
    router.get('/about', homeController.getAboutPage); 
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD); 
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD); //trả về một chuỗi 'edit crud' khi truy cập vào đường dẫn '/edit-crud'
    router.post('/put-crud', homeController.putCRUD); //trả về một chuỗi 'put crud' khi truy cập vào đường dẫn '/put-crud'
    router.get('/delete-crud', homeController.deleteCRUD); //trả về một chuỗi 'delete crud' khi truy cập vào đường dẫn '/delete-crud'
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    
    //restAPI: 
    // muốn lấy dữ liệu thì sử dụng phương thức get
    // muốn tạo dữ liệu thì sử dụng phương thức post
    // muốn xóa dữ liệu thì sử dụng phương thức delete
    // muốn cập nhật dữ liệu thì sử dụng phương thức put

    return app.use('/', router); //sử dụng router này cho tất cả các đường dẫn bắt đầu bằng '/'
}

module.exports = initWebRoutes;