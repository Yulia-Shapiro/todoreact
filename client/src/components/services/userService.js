import http from "./httpService"
import {apiUrl} from '../../config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = "token";


export function getJWT(){
    return localStorage.getItem(tokenKey);
}

export function logout(){
   localStorage.removeItem(tokenKey); 
}

export function getCurrentUser(){
    try{
      const jwt = localStorage.getItem(tokenKey) 
      return jwtDecode(jwt)
    }
    catch(ex){
       return null
   }
}

export async function login(email, password){
    const { data } = await http.post(`${apiUrl}/auth`, {email, password});

    localStorage.setItem(tokenKey, data.token);
}

const user = {
    login,
    getCurrentUser,
    logout,
    getJWT
};

export default user;