
import db from '../models/index'; //import db để kết nối với database
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {}; //khởi tạo một biến userData rỗng
            let isExist = await checkUserEmail(email); //kiểm tra xem email có tồn tại hay không
            if(isExist) {
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email}, 
                    raw: true                  
                    // attributes: {
                    //     include: ['email', 'roleId'], //define collums that you want to show
                    //     // exclude: [] // define collumns that you don't want to show
                    // }
                });
                if(user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password"

                    }
                }
                else {
                    //user not exist
                    userData.errCode = 2; //định nghĩa mã lỗi
                    userData.errMessage = 'User not found'
                    // resolve(userData)
                }
            }
            else {
                //user not exist
                userData.errCode = 1; //định nghĩa mã lỗi
                userData.errMessage = 'Your email is not exist in our system. Please try other email!'
                // resolve(userData)
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let  checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail}
            })
            if(user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail
}