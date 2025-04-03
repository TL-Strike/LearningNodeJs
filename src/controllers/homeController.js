
import db from '../models/index'; //import db từ file models/index.js

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

// để sử dụng được hàm getHomePage này thì cần phải export nó ra ngoài để có thể sử dụng được ở file khác
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}