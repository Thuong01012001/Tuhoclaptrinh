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
    let id = req.query.id; // All, Id
    
    if(!id){
        return res.status(400).json({
            errCode: 1,
            message: "Missing input parameter",
            users: []
    })
}
    let users = await userService.getAllUsers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users

    })
};

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    // Kiểm tra xem có truyền id hay không
    if (!req.body.id) {
        return res.status(400).json({
            errCode: 1,
            message: "Missing input parameter",
        });
    }

    try {
        // Truyền chính xác userId vào deleteUser
        let message = await userService.deleteUser(req.body.id); // Truyền id thay vì cả req.body
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: error.errCode || 3,
            errMessage: error.errMessage || "An error occurred while deleting the user",
        });
    }
};

let handleEditUser = async (req, res) => {
    try {
        console.log(req.body);
        let data = req.body; // Nhận dữ liệu từ request body
        let message = await userService.updateUserData(data); // Gọi hàm editUser từ service

        // Trả về thông báo theo kết quả từ editUser
        return res.status(200).json(message);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            errCode: 3,
            errMessage: "An error occurred while processing your request",
            error: error.message,
        });
    }
};



let getAllCode = async (req, res) => {
        try{
            setTimeout(async()=>{
                let data = await userService.getAllCodeService(req.query.type);
            return res.status(200).json(data);
            }, 3000)
        } catch(e) {
            res.status(400).json({
            errCode: -1,
            errMessage: 'Erorr from server',
            });
        }
};

export default {
    handleLogin,
    handleGetAllusers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
};
