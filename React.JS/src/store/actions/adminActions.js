import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors,saveDetailDoctor } from '../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error', e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})
// truyen du lieu vao action
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type:actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService('POSITION');
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFail());
            }
        }catch(e){
            dispatch(fetchPositionFail());
            console.log('fetchPositionStart error', e);
            
        }

    }
}
export const fetchPositionSuccess = (positiondata) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positiondata,
    })

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type:actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService('ROLE');
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFail());
            }
        }catch(e){
            dispatch(fetchRoleFail());
            console.log('fetchRoleStart error', e);
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const  fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await createNewUserService(data) ;
            console.log('check create user redux: ', res);
            if(res && res.errCode === 0){
                toast.success('User created successfully!');
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFail());
            }
        }catch(e){
            dispatch(saveUserFail());
            console.log('saveUserSucces error', e);
        }
    }

}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success('Delete the user succeed!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Delete the user error!');
                dispatch(deleteUserFail());
            }
        }catch(e){
            toast.error('Delete the user error!');
            dispatch(deleteUserFail());
            console.log('deleteUserSucces error', e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFail());
                toast.error('Fetch all users error!');
            }
        } catch (e) {
            toast.error('Fetch all users error!');
            dispatch(fetchAllUsersFail());
            console.log('fetchAllUsersStart error', e);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
})
export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success('Edit the user succeed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Delete the user error!');
                dispatch(editUserFail());
            }
        }catch(e){
            toast.error('Edit the user error!');
            dispatch(editUserFail());
            console.log('editUserSucces error', e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
})


export const fetchTopDoctor = () =>{
    return async (dispatch, getState) => {
        try{
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
                })
            }
        }catch(e){
            console.log('FETCH_TOP_DOCTOR_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
            })
        }
    }

}

export const fetchAllDoctor = () =>{
    return async (dispatch, getState) => {
        try{
            let res = await getAllDoctors('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
                })
            }
        }catch(e){
            console.log('FETCH_ALL_DOCTOR_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
            })
        }
    }

}

export const saveDetailDoctors = (data) =>{
    return async (dispatch, getState) => {
        try{
            let res = await saveDetailDoctor(data);
            if(res && res.errCode === 0){
                toast.success('Save Infor Detail Doctor succeed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDr: res.data,
                })
            }else{
                toast.error('Save Infor Detail Doctor error!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                })
            }
        }catch(e){
            toast.error('Save Infor Detail Doctor error!');
            console.log('SAVE_DETAIL_DOCTOR_FAIL: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            })
        }
    }

}

