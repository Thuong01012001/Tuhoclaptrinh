import axios from "../axios.js";

const handleLoginApi = (email,password) => {
    return axios.post('http://localhost:8080/api/login', { email, password });

}
export {
    handleLoginApi,
}