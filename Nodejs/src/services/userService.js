import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { where } from 'sequelize';
import bodyParser from 'body-parser';
const { raw } = bodyParser;
// Kiểm tra email có tồn tại hay không
let checkUserEmail = async (userEmail) => {
    try {
        let user = await db.User.findOne({
            where: { email: userEmail }
        });
        return !!user; // Trả về true nếu tồn tại, false nếu không
    } catch (e) {
        console.error(e);
        throw e;
    }
};
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
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: "Your email is already in use, please try another email",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar, 
                });

                resolve({
                    errCode: 0,
                    message: "User created successfully",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


// Xử lý đăng nhập
let handleUserLogin = async (email, password) => {
    try {
        let userData = {};

        // Kiểm tra email có tồn tại không
        let isExist = await checkUserEmail(email);
        if (!isExist) {
            userData.errCode = 1;
            userData.errMessage = "Your email doesn't exist in our system. Please try another email!";
            return userData;
        }

        // Tìm thông tin user theo email
        let user = await db.User.findOne({
            where: { email: email }, 
            attributes: ['email', 'password', 'roleId', 'firstName','lastName'],
            raw: true
        });

        if (!user) {
            userData.errCode = 2;
            userData.errMessage = "User not found";
            return userData;
        }

        // Kiểm tra mật khẩu
        let isPasswordValid = await bcrypt.compare(password, user.password);// Hàm so sánh mật khẩu
        if (!isPasswordValid) {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
            return userData;
        }

        // Xóa mật khẩu trước khi trả về thông tin user
        delete user.password;
        userData.errCode = 0;
        userData.errMessage = "Successfully login";
        userData.user = user;

        return userData;
    } catch (e) {
        console.error(e);
        return {
            errCode: 500,
            errMessage: "Internal Server Error",
        };
    }
};

let getAllUsers = (userId) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let users = '';
            if(userId === 'All'){
                users = db.User.findAll({
                    attributes: {
                   exclude: ['password']},
                   raw: true ,

                })
            }if(userId && userId !== 'All'){
                users = db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']}
                })

            }
            resolve(users)

        }catch(e){
            reject(e);
        }

})
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra nếu userId không hợp lệ
            if (!userId) {
                return resolve({
                    errCode: 2,
                    errMessage: "User ID is required",
                });
            }

            // Tìm người dùng theo ID
            let foundUser = await db.User.findOne({
                where: { 
                    id: userId,
                },
                
            });

            // Kiểm tra nếu không tìm thấy người dùng
            if (!foundUser) {
                return resolve({
                    errCode: 1,
                    errMessage: "User not found",
                });
            }

            // Xóa người dùng
            await db.User.destroy({
                where: { id: userId },
               
            });

            // Phản hồi thành công
            resolve({
                errCode: 0,
                errMessage: "User deleted successfully",
            });
        } catch (error) {
            console.error('Error deleting user:', error.message);
            reject({
                errCode: 3,
                errMessage: "An error occurred while deleting the user",
                error: error.message,
            });
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                return resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters",
                });
            }

            if (!data.firstName || !data.lastName) {
                return resolve({
                    errCode: 3,
                    errMessage: "First name and Last name are required",
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (user) {
                await user.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address || user.address,
                    roleId: data.roleId || user.roleId,
                    gender: data.gender || user.gender,
                    positionId: data.positionId || user.positionId,
                    phoneNumber: data.phoneNumber || user.phoneNumber,
                });
                if (data.avatar) {
                    user.image = data.avatar; 
                }
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "User updated successfully",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found",
                });
            }
        } catch (e) {
            console.error("Error updating user:", e);
            reject({
                errCode: 3,
                errMessage: "An error occurred while updating the user",
                error: e.message,
            });
        }
    });
};


let getAllCodeService = async (typeInput) => {
    try {
        let res = {};
        if (!typeInput) {
            return {
            errCode: 1,
            errMessage: 'Missing required parameters',
            };
            }
            let allcode = await db.Allcode.findAll({
                where: {
                type: typeInput,
                },
            });
  
            return {
                errCode: 0,
                data: allcode,
            };
    } catch (e) {
        console.error('Error in getAllCodeService:', e);
            return {
                errCode: 2,
                errMessage: 'Something went wrong',
            };
    }
};
  

export default {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService,
};
