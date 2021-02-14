import React, { Component } from 'react';
import PageHeader from "../common/pageHeader";
import todoService from "../services/todoService";
import AddTodo from './addTodo';
import TodoList from "./todoList";
import SearchTodo from "./searchTodo";

class MyTodos extends Component {
    state = {
      todos:[],
      search: '',
      }

    async componentDidMount(){
      const {data} = await todoService.getMyTodos();
      this.setState({todos:data});
    }

    handleNewTodo=(todoName)=>{
    this.props = todoName;
    let newTodo = {"todoName": todoName.todoName ,"completed":false, "_id": todoName.todoName}  
    this.setState({ todos: [...this.state.todos, newTodo] });
    }

    deleteTodo = async (todoId) =>{
      let todos = [...this.state.todos];
      todos = todos.filter(todo=>todo._id !== todoId);
      this.setState({todos});
      await todoService.deleteTodo(todoId);
    }

    updateTodo = async ({updatedTodo}) => {
      let oldTodos=this.state.todos;
      let newTodos=oldTodos.filter(todo=>{return todo._id !== updatedTodo._id});
      newTodos.push(updatedTodo);
      this.setState(this.state.todos=[...newTodos]);
       await todoService.editTodo(updatedTodo);
    }
    
    toggleChekbox = async(todoOld)=>{
      let updatedTodo= this.state.todos.find(todo=> todo._id === todoOld._id );
      updatedTodo.completed = !updatedTodo.completed;
      this.setState({updatedTodo:updatedTodo});
      await todoService.editTodo(updatedTodo);
    }
    onSearch = (search) => {
      this.setState({search: search.toLowerCase()});
    };

    render() { 
        const {todos, search} = this.state;
        const todoList = todos.filter(todo=>todo.todoName.toLowerCase().includes(search));
        return (<div className="minWidth col">
        <PageHeader  pageTitle="Todo"/>
                
              <AddTodo getTodo={this.handleNewTodo} />
            <div className="lightbox minWidth col">
              <h4>My Todo List</h4> 
              <SearchTodo onSearch={this.onSearch}/>
              
              <TodoList todoList={todoList} deleteTodo={this.deleteTodo}  updateTodo={this.updateTodo} toggleChekbox={this.toggleChekbox}/>
            </div>
         
        </div> );
    }
}
 
export default MyTodos;