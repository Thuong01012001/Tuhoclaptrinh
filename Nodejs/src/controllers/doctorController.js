import doctorService from '../services/doctorService.js';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;

    try{
        let response  = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        });
    }
}

let getAllDoctors = async(req, res) =>{
    try{
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);

    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let postInforDoctors = async(req,res) =>{
    try{
        console.log('Data received from client:', req.body);
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);

    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getDetailDoctorById = async(req,res) =>{
        try{
            let info = await doctorService.getDetailDoctorById(req.query.id);
            return res.status(200).json(info);
        }catch(e) {
            console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

export default {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctors,
    getDetailDoctorById,
 
};