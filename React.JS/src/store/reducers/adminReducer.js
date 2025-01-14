import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: {
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            console.log('hoidanit fire fetch gender', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_GENDER_SUCCESS: {
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            console.log('hoidanit fire fetch success gender', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_GENDER_FAIL: {
            let copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            console.log('hoidanit fire fail gender', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_POSITION_START: {
            let copyState = { ...state };
            copyState.isLoadingPosition = true;
            console.log('hoidanit fire fetch position', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_POSITION_SUCCESS: {
            let copyState = { ...state };
            copyState.positions = action.data;
            copyState.isLoadingPosition = false;
            console.log('hoidanit fire fetch success position', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_POSITION_FAIL: {
            let copyState = { ...state };
            copyState.isLoadingRole = false;
            copyState.positions = [];
            console.log('hoidanit fire fail position', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ROLE_START: {
            let copyState = { ...state };
            copyState.isLoadingRole = true;
            console.log('hoidanit fire fetch role', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ROLE_SUCCESS: {
            let copyState = { ...state };
            copyState.roles = action.data;
            copyState.isLoadingRole = false;
            console.log('hoidanit fire fetch role success', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ROLE_FAIL: {
            let copyState = { ...state };
            copyState.isLoadingRole = false;
            copyState.roles = [];
            console.log('hoidanit fire fetch role fail', copyState);
            return {
                ...copyState,
            };
        }
        
        case actionTypes.FETCH_ALL_USERS_SUCCESS: {
            let copyState = { ...state };
            copyState.users = action.users;
            console.log('hoidanit fire fetch all_user gender', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_USERS_FAIL: {
            let copyState = { ...state };
            copyState.users = [];
            console.log('hoidanit fire fail all_user', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.CREATE_USER_SUCCESS: {
            let copyState = { ...state };
            copyState.users = [...state.users, action.user];
            console.log('Create user success', copyState);
            return { ...copyState };
        }
        case actionTypes.CREATE_USER_FAIL: {
            let copyState = { ...state };
            console.log('Create user fail', action.error);
            return { ...copyState };
        }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS: {
            let copyState = { ...state };
            copyState.topDoctors =  action.dataDoctors; // Chu y ykhi update du lieu dong khong duoc noi mang se lam sai
            return { ...copyState };
        }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL: {
            let copyState = { ...state };
            copyState.topDoctors = [];
            return { ...copyState };
        }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS: {
            let copyState = { ...state };
            copyState.allDoctors =  action.dataDr; // Chu y ykhi update du lieu dong khong duoc noi mang se lam sai
            return { ...copyState };
        }
        case actionTypes.FETCH_TALL_DOCTORS_FAIL: {
            let copyState = { ...state };
            copyState.allDoctors = [];
            return { ...copyState };
        }

        
        default:
            return state;
    }
};

export default adminReducer;
