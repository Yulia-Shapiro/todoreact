import http from "./httpService";
import { apiUrl } from "../../config.json";


export function getUser(){
    return http.get(`${apiUrl}/users/getcurrent`)  
    
}

export function userTodos(userId){
    return http.get(`${apiUrl}/todos/usertodos/${userId}`);
}

export function getMyUsers(){
    return http.get(`${apiUrl}/users/getallusers`)  
}
export function editLikeTodo(todo){
   const todoId = todo._id;
   return http.put(`${apiUrl}/todos/editlike/${todoId}`, todo)
}

export function editTodo(todo){
   const todoId = todo._id;
   delete todo._id;
   return http.put(`${apiUrl}/todos/edit/${todoId}`, todo)
}

export function getOneTodo(todoID){
   return http.get(`${apiUrl}/todos/edit/${todoID}`);
}

export function deleteTodo(todoId){
    return http.delete(`${apiUrl}/todos/${todoId}`)
}

export function getMyTodos(){
    return http.get(`${apiUrl}/todos/todo`)
}

export function createTodo(todo){
    return http.post(`${apiUrl}/todos`, todo)
}

export default {
    createTodo,
    getMyTodos,
    deleteTodo,
    getOneTodo,
    getMyUsers,
    userTodos,
    editTodo,
    editLikeTodo,
    getUser 
}