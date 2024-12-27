import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import bodyParser from 'body-parser';

const { raw } = bodyParser;

// Tao user moi nhap user tu ngoai vao
let createNewUser = async(data) =>{
    return new Promise(async(resolve, reject) => {
    try{
        let hashPasswordFromBcrypt = await hashUserPassword(data.password); 
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
            positionId: data.positionId,
        })
            resolve('Ok create a new user succeed')

        } catch (error) {
            reject(e)
        }

    })
}
// Hash pass

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            // Mã hóa mật khẩu người dùng nhập vào
            const salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(password, salt); // Sử dụng mật khẩu thực tế
            resolve(hashPassword); // Trả về mật khẩu đã mã hóa
        } catch (e) {
            reject(e); // Nếu có lỗi, trả về lỗi
        }
    });
}


//
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true 
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let getUserInfoById = (userid) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {  id: userid},
                raw: true
            })
            if(user){
                resolve(user);
            }else{
                resolve(null);
            }
        }catch(e){
            reject(e);

    }
});
}

let updateUserData = (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { id: data.id },
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();

            }
    
        }catch(e){
            reject(e);
    }
    });

}

let deleteUserById = (userid) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { id: userid }
            })
            if(user){
               await user.destroy();
            }
            resolve();

        }catch(e){
            reject(e);
            }
    }
)}
export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUserData,
    deleteUserById,

};