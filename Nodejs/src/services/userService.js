import bcrypt from 'bcryptjs';
import db from '../models/index.js';

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
            attributes: ['email', 'password', 'roleId'],
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

export default {
    handleUserLogin,
};
