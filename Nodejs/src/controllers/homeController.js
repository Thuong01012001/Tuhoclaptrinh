
import db from "../models/index.js";
import CRUDService from './../services/CRUDService.js';

let getHomePage = async (req, res) => {
    try {
     let data = await db.User.findAll();
     return res.render('homepage.ejs',{
        data: JSON.stringify(data)
     });
    } catch (e) {
        console.log(e);
    }
  };
  
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');  
}

let  getCRUD = (req,res) =>{
   
    return res.render('crud.ejs');
}

let postCRUD = async(req,res) =>{
   let message = await CRUDService.createNewUser(req.body);
    console.log(message)
   return res.send('post crud from server');
}

let displayGetCRUD = async (req,res) =>{
    let data = await CRUDService.getAllUser();
    console.log('----')
    console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable : data
    });
}

let getEditCRUD = async(req,res)=>{
    let userid = req.query.id;
    if(userid){
        let userData = await CRUDService.getUserInfoById(userid);
        // check user data not found

        //let userData
        return res.render('EditCrud.ejs', {
            user: userData
        });
    }
    else{
        return res.send('User not found');
    }
}

let putCRUD = async(req,res) =>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable : allUsers
    });
}

let deleteCRUD = async(req,res) =>{
    let id = req.query.id;
   if(id){ await CRUDService.deleteUserById(id);
    return res.send('Delete the user success');
}else{
    return res.send('User not found');
}
}

export default { 
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    CRUDService,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
