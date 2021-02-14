import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import { Checkbox, Icon } from 'react-materialize';
import EditTodo from "./editTodo";

class TodoList extends Form {
      state = {
        data: {_id: 0, todoName:'', completed:false,},
        errors: {}
      }

      schema={
        todoName: Joi.string().min(2).max(255),
        _id:Joi.number().integer(),

    }
  
     checkedTodo=(e, todo)=>{
       this.props.toggleChekbox(todo);
     }

     deleteTodoItem =(e, todoID) =>{
         e.preventDefault();
        this.props.deleteTodo(todoID);
     }

     updateTodo=({updatedTodo})=>{
       this.props.updateTodo({updatedTodo});
     }
    render() { 
        const {todoList} = this.props;
        return ( <div >
           
              {
              todoList.map(todo => <div key={todo._id}  className="todoitem">
                <Checkbox
                  id={todo._id}
                  label=""
                  checked={todo.completed}
                  value={todo.todoName}
                  onChange={(e)=>this.checkedTodo(e, todo)}
                />  
                <div className="todoText teal-text">
                 <span>{todo.todoName}</span>
                </div>

               <EditTodo todo={todo} key={todo._id} updateTodo={this.updateTodo} />

               <Icon className="teal-text todoBtn" onClick={(e)=>this.deleteTodoItem(e,todo._id)}> delete_forever </Icon>

         </div>)}
         
     </div> );
    }
}
 
export default TodoList;