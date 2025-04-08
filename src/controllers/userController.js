
import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //check email and password
    // check email exist
    // compare password
    // return user info
    // return access_token: JWT-Json Web Token - cơ chế bảo mật thông tin giữa client và server

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1, // định nghĩa/ định danh mã lỗi
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers =  async (req, res) => {
    let id = req.query.id; // ALL (lấy tất cả users), id (lấy 1 users) 
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    // console.log(users)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}