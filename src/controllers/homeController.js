
let getHomePage = (req, res) => {
    return res.render('homePage.ejs') //trả về một chuỗi 'Hello World' khi truy cập vào đường dẫn '/'
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

// để sử dụng được hàm getHomePage này thì cần phải export nó ra ngoài để có thể sử dụng được ở file khác
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}