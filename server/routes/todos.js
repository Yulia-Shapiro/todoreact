const express = require("express");
const _ = require("lodash");
const {Todo, validateTodo } = require("../models/todo");
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/usertodos/:id',auth, async(req,res) => {
    var currentUserId = req.params.id;
    const todos = await Todo.find({userId:currentUserId}).select();
    res.send(todos);
})
router.put('/editlike/:id', auth, async(req,res)=>{
    let todo = await Todo.findOneAndUpdate({_id:req.params.id}, req.body);
    if(!todo) return res.status(404).send('todo with the given ID not found');
    todo= await Todo.findOne({_id:req.params.id});
     res.send(todo);
})

router.put('/edit/:id', auth, async(req,res)=>{
    let todo = await Todo.findOneAndUpdate({_id:req.params.id, userId:req.user._id}, req.body);
    if(!todo) return res.status(404).send('todo with the given ID not found');
    todo= await Todo.findOne({_id:req.params.id, userId:req.user._id});
    res.send(todo);
})

router.get('/edit/:id', auth, async(req,res)=>{
    const todo = await Todo.findOne({userId:req.user._id});
    res.send(todo);
})
router.delete('/:id', auth, async(req,res)=>{
    const todo = await Todo.findOneAndRemove({_id:req.params.id, userId:req.user._id});
    res.send(todo);
})

router.get('/:id', auth, async(req,res)=>{
    const todo = await Todo.find({userId:req.user._id});
    if(!todo) return res.status(404).send('not found with thisID');
    res.send(todo);
})


router.post('/', auth, async(req, res)=>{
     
    const {error} = validateTodo(req.body); 
    
    let todo = new Todo(
      {
        todoName: req.body.todoName,
        userId:req.user._id,
        liked: 0,
        completed: false
      }
    ); 
    if(!todo) return res.status(404).send(error.details[0].message);
    console.log("POST-TUT", todo);
    post = await todo.save();
    res.send(post); 

})

module.exports = router;