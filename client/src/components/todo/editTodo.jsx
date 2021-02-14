import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import { Icon, Modal, Button  } from 'react-materialize';


class EditTodo extends Form {
  state = {
    data: {todoName: ""},
    errors: {}
  }

  schema={
    todoName: Joi.string().min(2).max(255),
    _id:Joi.number().integer(),
}
doSubmit = async () => {
  const newTodoName = this.state.data.todoName;
  const {todo} = this.props;
  const updatedTodo ={_id: todo._id, todoName:newTodoName, completed:todo.completed};
  this.props.updateTodo({updatedTodo});
}
 
render() { 
    const {todo} = this.props;
    return (
      <React.Fragment> 
       <Modal actions={[
         <Button flat modal="close" node="button" waves="green">Close</Button>
       ]}
          bottomSheet={false}
          fixedFooter={false}
          header="do you whant to edit this todo?"
          id={todo._id}
          open={false}
          options={{
            dismissible: true,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}
         trigger={<Icon className="teal-text todoBtn" id={todo._id}> edit </Icon>}
        >
      <div>
      <p>Previous: <b> {todo.todoName}</b> </p>
      <p><b>{todo._id}</b></p>

      <form onSubmit={this.handleSubmit} 
                autoComplete="off"
                method="POST"
            >                        
                {this.renderInput("todoName", "todoName")}  
                {this.renderButton("Edit Todo")}
      </form>

      </div>

</Modal>


         </React.Fragment>
      );
    }
}
 
export default EditTodo;