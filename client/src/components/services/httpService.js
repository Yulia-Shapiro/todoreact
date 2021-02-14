import axios from 'axios';
import {toast} from 'react-toastify';
import userService from "./userService";

axios.defaults.headers.common['x-auth-token'] = userService.getJWT();

axios.interceptors.response.use(null, error=>{
    const expectedError = error.response && error.response.status >= 403;
    if(expectedError){toast('An unexpected error occured', {position: 'top-center', autoClose:5000})}
    return Promise.reject(error);
})

const http = {

    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
}

export default http;