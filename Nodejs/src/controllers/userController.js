import userService from '../services/userService.js';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // Kiểm tra đầu vào
    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: "Missing input parameter",
        });
    }

    try {
        // Gọi service để xử lý logic
        let userData = await userService.handleUserLogin(email, password);

        // Kiểm tra lỗi trong userData và trả về thông báo phù hợp
        if (userData.errCode !== 0) {
            return res.status(400).json({
                errCode: userData.errCode,
                message: userData.errMessage,
                user: userData.user || {}
            });
        }

        // Đăng nhập thành công
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user || {}
        });

    } catch (e) {
        console.error("Error during login:", e);
        return res.status(500).json({
            errCode: 500,
            message: "An error occurred while processing the request.",
        });
    }
};

let handleGetAllusers = async (req,res) =>{
    let id = req.body.id; // All, Id
    
    if(!id){
        return res.status(400).json({
            errCode: 1,
            message: "Missing input parameter",
            users: []
    })
}
    let users = await userService.getAllusers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users

    })
};

export default {
    handleLogin,
    handleGetAllusers,
};
