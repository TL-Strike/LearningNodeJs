
import db from '../models/index'; //import db để kết nối với database
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    // resolve: nếu mọi việc thành công thì sẽ gọi hàm này
    // reject: nếu có lỗi thì sẽ gọi hàm này
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword) //trả về mật khẩu đã được mã hóa
        } catch (e) {
            reject(e)
        }
    })
}

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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"]
                    }
                })
            }
            if(userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ["password"]
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exist
            let check = await checkUserEmail(data.email);
            if(check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is exist. Please try another email.'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword (data.password); //mã hóa mật khẩu bằng hàm hashUserPassword
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false, //true or false
                    roleId: data.roleId
                })
                // console.log(data)
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                }) 
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user =  await db.User.findOne({
                where: {id: userId}
            })
            if(!user) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exist."
                })
            }
            // await user.destroy();
            await db.User.destroy({
                where: {id: userId}
            })
            resolve({
                errCode: 0,
                errMessage: "The user is deleted."
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            if(!data) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id},
                raw: false
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // }); //lưu lại thông tin người dùng đã được cập nhật
                resolve({
                    errCode: 0,
                    errMessage: 'Update user succeeds'
                }); //trả về một đối tượng rỗng nếu không tìm thấy người dùng
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                }); //trả về một đối tượng rỗng nếu không tìm thấy người dùng
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}