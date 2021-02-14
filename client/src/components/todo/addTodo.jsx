import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import todoService from '../services/todoService';
import {Icon} from 'react-materialize';

class AddTodo extends Form {
   
    state = {
        data: {todoName: ""},
        errors: {}
      }

      schema={
        todoName: Joi.string().min(2).max(255),
     }

    doSubmit = async () => {
        const todoName= {...this.state.data};
        await todoService.createTodo(todoName);
        this.setState(todoName);
        this.props.getTodo(todoName);
        let newState=this.state;
        newState.data.todoName="";
        this.setState(newState);
    }
    render() { 
        return (<div className="lightbox">
             <h5> <span> <Icon> border_color </Icon> </span> add new todo:</h5>
            <form onSubmit={this.handleSubmit} 
                autoComplete="off"
                method="POST"
            >                     
                {this.renderInput("todoName", "type todo here")}  
                {this.renderButton("Add Todo")}
            </form>
        </div>   
      );
    }
}
 
export default AddTodo;