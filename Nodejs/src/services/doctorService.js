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
          if (!inputData.doctorId || !inputData.contentHTML ||
            !inputData.contentMarkdown || !inputData.action) {
              resolve({
                  errCode: 1,
                  message: 'Missing required parameters'
              });
          } else {
              if(inputData.action === 'CREATE'){
                await db.Markdown.create({
                  doctorId: inputData.doctorId,
                  contentHTML: inputData.contentHTML,
                  contentMarkdown: inputData.contentMarkdown,
                  description: inputData.description,
              });
              }else if(inputData.action === 'EDIT'){
                let doctorMarkdown = await db.Markdown.findOne({
                  where: {
                    doctorId: inputData.doctorId
                  },
                  raw: false
                })
                if(doctorMarkdown){
                  doctorMarkdown.contentHTML = inputData.contentHTML;
                  doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                  doctorMarkdown.description = inputData.description;
                  await doctorMarkdown.save()
                }
              }
             
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


let getDetailDoctorById = async (inputId) => {
  try {
    if (!inputId) {
      return {
        errCode: 1,
        errMessage: "Missing required parameters",
      };
    }

    const query = `
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
      WHERE u.id = :inputId;
    `;

    // Thực hiện truy vấn
    const rows = await db.sequelize.query(query, {
      replacements: { inputId },
      type: db.Sequelize.QueryTypes.SELECT,
    });

    if (rows.length === 0) {
      return {
        errCode: 2,
        errMessage: "Doctor not found",
      };
    }

    // Tách thông tin chính và Markdown
    const user = {
      firstName: rows[0].firstName,
      lastName: rows[0].lastName,
      address: rows[0].address,
      image: rows[0].image
        ? new Buffer(rows[0].image, "base64").toString("binary")
        : null,
      phoneNumber: rows[0].phoneNumber ,
      email: rows[0].email,
      gender: rows[0].gender,
      positionId: rows[0].positionId,
      roleId: rows[0].roleId,
      createdAt: rows[0].createdAt,
      updatedAt: rows[0].updatedAt,
      positionValueEn: rows[0].positionValueEn,
      positionValueVi: rows[0].positionValueVi,
      roleValueEn: rows[0].roleValueEn,
      roleValueVi: rows[0].roleValueVi,
      Markdown: rows.map((row) => ({
        contentHTML: row.contentHTML || '',
        contentMarkdown: row.contentMarkdown || '',
        description: row.description || '',
      })),
    };

    return {
      errCode: 0,
      data: user,
    };
  } catch (e) {
    console.error("Error in getDetailDoctorById:", e);
    throw new Error(e.message);
  }
};

export default { 
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,
};
