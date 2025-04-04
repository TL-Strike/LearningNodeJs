
import db from '../models/index'; //import db từ file models/index.js
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); //lấy tất cả dữ liệu từ bảng user trong cơ sở dữ liệu
        console.log('--------------------------')
        console.log(data)
        console.log('--------------------------')
        return res.render('homePage.ejs', {
            data: JSON.stringify(data) //truyền dữ liệu vào view homePage.ejs
        }); //trả về một chuỗi 'Hello World' khi truy cập vào đường dẫn '/'
    }catch(e) {
        console.log(e) //nếu có lỗi thì sẽ in ra lỗi đó
    }    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')//trả về một chuỗi 'CRUD page' khi truy cập vào đường dẫn '/crud'
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body); //gọi hàm createNewUser trong file CRUDService.js và truyền vào dữ liệu của form
    console.log(message) 
    return res.send('post crud from server') //trả về một chuỗi 'post crud from server' khi truy cập vào đường dẫn '/post-crud'
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser({
        raw: true,
    }); //gọi hàm getAllUser trong file CRUDService.js để lấy tất cả người dùng
    console.log('--------------------------')
    console.log(data) //in ra dữ liệu của người dùng
    console.log('--------------------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data //truyền dữ liệu vào view displayCRUD.ejs
    }) //trả về một chuỗi 'display crud' khi truy cập vào đường dẫn '/get-crud'
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id; //lấy id từ query string
    if(userId){
        let userData = await CRUDService.getUserInforById(userId); //gọi hàm getUserInforById trong file CRUDService.js để lấy thông tin người dùng theo id
        
        return res.render('editCRUD.ejs', {
            user: userData //truyền dữ liệu vào view editCRUD.ejs
        })
    }
    else {
        return res.send('Users not found!') //trả về một chuỗi 'get edit crud' khi truy cập vào đường dẫn '/edit-crud'
    }
}

let putCRUD = async (req, res) => {
    let data = req.body; 
    let allUsers = await CRUDService.updateUserData(data); //gọi hàm updateUserData trong file CRUDService.js để cập nhật thông tin người dùng
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers //truyền dữ liệu vào view displayCRUD.ejs
    }) 
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id) {
        let allUsers = await CRUDService.deleteUserById(id); //gọi hàm deleteUserById trong file CRUDService.js để xóa người dùng theo id
        return res.send('Delete user succeed!') //trả về một chuỗi 'Delete user succeed!' khi xóa người dùng thành công
        // return res.render('displayCRUD.ejs', {
        //     dataTable: allUsers //truyền dữ liệu vào view displayCRUD.ejs
        // })
    }
    else {
        return res.send('User not found!') //trả về một chuỗi 'get edit crud' khi truy cập vào đường dẫn '/edit-crud'
    }
    
}

// để sử dụng được hàm getHomePage này thì cần phải export nó ra ngoài để có thể sử dụng được ở file khác
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}