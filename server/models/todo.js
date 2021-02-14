const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const todoSchema = new mongoose.Schema({
  
    todoName: {
        type: String,
        minlength: 2,
        maxlength: 255
      },
      completed:{
        type:Boolean
      },
      liked:{
        type:Number
      },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      createdAt: { type: Date, default: Date.now },
});
function validateTodo(todo) {
    const schema = Joi.object({
        todoName: Joi.string().min(2).max(255).required(),
        completed: Joi.boolean().validate('false', {convert:true}),
        liked: Joi.number().integer()
    });
    return schema.validate(todo);
}
const Todo = mongoose.model('Todo', todoSchema);

exports.Todo = Todo;
exports.validateTodo=validateTodo;
