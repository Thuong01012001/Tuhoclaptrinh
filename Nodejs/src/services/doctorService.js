import { where } from 'sequelize';
import db from '../models/index.js';
import bodyParser from 'body-parser';
const { raw } = bodyParser;



let getTopDoctorHome = async (limitInput) => {
  try {
    let query = `
      SELECT 
          u.id, 
          u.email, 
          u.firstName, 
          u.lastName,
          u.image,
          u.phoneNumber, 
          u.address, 
          u.roleId, 
          gender.valueEn AS genderValueEn, 
          gender.valueVi AS genderValueVi, 
          position.valueEn AS positionValueEn, 
          position.valueVi AS positionValueVi
          
      FROM Users AS u
      LEFT JOIN allcodes AS gender ON u.gender = gender.keyMap
      LEFT JOIN allcodes AS position ON u.positionId = position.keyMap
      WHERE u.roleId = 'R2'
      ORDER BY u.createdAt DESC
      LIMIT :limitInput;

    `;
    let users = await db.sequelize.query(query, {
      replacements: { limitInput }, // Tránh SQL Injection
      type: db.Sequelize.QueryTypes.SELECT,
    });

    return { errCode: 0, data: users };
  } catch (e) {
    throw new Error(`Error fetching doctors: ${e.message}`);
  }
};

let getAllDoctors = () => {
    return new Promise(async(resolve,reject)=>{
      try{
        let doctors = await db.User.findAll({
          where: {
            roleId: 'R2',
          },
          attributes: {
            exclude: ['password', 'image'],
          }

        })
        resolve({
          errCode: 0,
          data: doctors
        })

      }catch(e){
        reject(e)
      }

    })
}

let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
      try {
          if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
              resolve({
                  errCode: 1,
                  message: 'Missing required parameters'
              });
          } else {
              // Nếu tất cả tham số đều có đủ, tiến hành lưu vào database
              await db.Markdown.create({
                  doctorId: inputData.doctorId,
                  contentHTML: inputData.contentHTML,
                  contentMarkdown: inputData.contentMarkdown,
                  description: inputData.description,
              });
              resolve({
                  errCode: 0,
                  message: 'Save info doctor succeed!'
              });
          }
      } catch (e) {
          reject(e);
      }
  });
};


let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let query = `
              SELECT 
                u.firstName, 
                u.lastName, 
                u.address, 
                u.image,
                u.phoneNumber, 
                u.email,
                u.gender, 
                u.positionId, 
                u.roleId, 
                u.createdAt, 
                u.updatedAt,
                m.contentHTML, 
                m.contentMarkdown, 
                m.description,
                position.valueEn AS positionValueEn, 
                position.valueVi AS positionValueVi,
                role.valueEn AS roleValueEn, 
                role.valueVi AS roleValueVi
              FROM Users u
              LEFT JOIN markdowns m ON u.id = m.doctorId
              LEFT JOIN allcodes AS position ON u.positionId = position.keyMap
              LEFT JOIN allcodes AS role ON u.roleId = role.keyMap
              WHERE u.id = :inputId
            `;


        let [data] = await db.sequelize.query(query, {
          replacements: { inputId },
          type: db.Sequelize.QueryTypes.SELECT,
        });
        if(data && data.image){
          data.image = new Buffer(data.image, 'base64').toString('binary');
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


export default { 
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,

};
