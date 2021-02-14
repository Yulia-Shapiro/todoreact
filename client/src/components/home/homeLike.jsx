import React, { Component } from 'react';

class HomeLike extends Component {
    state = { 
        score:0,
     }
    likedTodo = async (todo, like)=>{   
        let {score} = this.state;
        if(like === 'like'){
             score++;
             this.setState({score:score});
        }else if(score > 0){
              score--;
              this.setState({score:score});
        }
        // this.setState({score:score});
        const updatedScore={_id: todo._id, todoName:todo.todoName, userId:todo.userId,liked: score, completed:todo.completed };
        this.props.updateScoreTodo({updatedScore});
    }
    render() { 
        const {todo} = this.props;
        return ( <div>
            <span onClick={()=>this.likedTodo(todo, 'like')}>
                {todo.liked ? `💖 ${todo.liked}` : `🤍 ${todo.liked}` }
            </span>
            <span onClick={()=>this.likedTodo(todo, 'dislike')}>  👎</span>
        </div> );
    }
}
 
export default HomeLike;