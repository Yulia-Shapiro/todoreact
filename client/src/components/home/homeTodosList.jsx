import React, { Component } from 'react';
import todoService from "../services/todoService";
import HomeLike from './homeLike';

class HomeTodosList extends Component {
    state = { 
        todos:[],
        userId:"",
     }

    async componentDidMount(){
    this.setState({userId:this.props.userId});
    const userTodos = await todoService.userTodos(this.props.userId);
    this.setState({todos:userTodos.data});
    // console.log(this.state);
    } 
    updateScoreTodo = async ({updatedScore}) => {
      let todos=this.state.todos;
      let newTodosItem = todos.findIndex(todo=> todo._id === updatedScore._id);
      todos.splice(newTodosItem, 1, updatedScore );
      this.setState(this.state.todos=[...todos]);
      console.log("STATE",this.state.todos);
      console.log("DDDDFDF", updatedScore);
      await todoService.editLikeTodo(updatedScore); 
    }

    render() { 
        const {todos} = this.state;
        return ( 
           <ul>
            {todos.map(todo => 
              <li className="todosinHome" key={todo._id}>
                 {todo.todoName}
                 <HomeLike todo={todo} key={todo._id} updateScoreTodo={this.updateScoreTodo}/>
              </li>      
            )}
           </ul>     
     );
    }
}
 
export default HomeTodosList;