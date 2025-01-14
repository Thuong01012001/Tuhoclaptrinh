import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './appReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2, // Cách hợp nhất state
};

// Cấu hình persist cho user
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',  // Key lưu trữ trong localStorage
    whitelist: ['isLoggedIn', 'userInfo'],  // Chỉ lưu các phần cần thiết
};
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language'],
}

// Combine các reducer và persist cho user
export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),  // Sử dụng persistReducer cho user
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,  
});
