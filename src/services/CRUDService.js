import bcrypt from "bcryptjs";
import db from "../models/index"; //import db từ models/index.js
import { raw } from "body-parser";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new  Promise(async (resolve, reject) => {
        try {
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
            resolve('create a new user succeed!') //trả về một chuỗi 'create a new user succeed!' khi tạo người dùng thành công
        } catch (e) {
            reject(e)
        }
    })
}

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

let getAllUser = () => {
    return new Promise((resolve, eject) => {
        try {
            let users = db.User.findAll();
            resolve(users) //trả về tất cả người dùng trong cơ sở dữ liệu
        } catch (e) {
            reject(e)
        }
    })
}
let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId},
                raw: false //lấy dữ liệu thô từ cơ sở dữ liệu
            })
            if(user) {
                resolve(user) //trả về người dùng theo id
            } else {
                resolve({}) //trả về một đối tượng rỗng nếu không tìm thấy người dùng
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); //lưu lại thông tin người dùng đã được cập nhật
                let allUsers = await db.User.findAll(); //lấy tất cả người dùng trong cơ sở dữ liệu
                resolve(allUsers); //trả về một đối tượng rỗng nếu không tìm thấy người dùng
            }
            else {
                resolve(); //trả về một đối tượng rỗng nếu không tìm thấy người dùng
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData
}