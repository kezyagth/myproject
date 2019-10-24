const Models = require('../models/index');
const Joi = require('@hapi/joi');
let statusCode = 200;
const todoHandler = async (request, h) => {
    try{
        const todos = await Models.Todos.findAll({})
        return {data: todos}
    }catch(error){
        return h.response({error: error.message}).code(400)
    }
}

 
const createTodoHandler = async (request, h) => {
    try{    
        const {titleReq, descriptionReq, userIdReq, completedReq,dateReq,emailReq} = request.payload;
        console.log(request.payload);


        const todo = await Models.Todos.create({
            title: titleReq,
            description: descriptionReq,
            userId: userIdReq ,
            dateActivity: dateReq,
            completed: completedReq,
            email: emailReq
        })

        return{
            data: todo,
            message: 'New todo has been created',
            statusCode: statusCode,
            error: ''
        }
    }catch(error){
            return h.response({
                error: error.message
            }).code(400)
    }
}

const updateTodoHandler = async (request, h) => {
    try {
        const todo_id = request.params.id;
        const { titleReq, descriptionReq, completedReq,dateReq,emailReq} = request.payload;
        const todo = await Models.Todos.update({
            title: titleReq,
            description: descriptionReq,
            dateActivity : dateReq,
            completed: completedReq,
            email:emailReq
        }, {
            where: {
                id: todo_id
            }
        })

        const dataRequest = request.payload
        console.log('dataRequest');
        console.log(todo);
        return{
            data: dataRequest,
            message: ' Todo has been updated',
            statusCode: statusCode,
            error: ''
        }

    }catch(error){
        return h.response({
            error: error.message
        }).code(400)
    }
}

const deleteTodoHandler = async (request, h) => {
    try{
        const todo_id = request.params.id;
        await Models.Todos.destroy({
            where: {
                id: todo_id
            }
        })
        return{
            message: ' Todo has been deleted',
            statusCode: statusCode,
            error: ''
        }
    }catch (error){
        return h.response({
            error: error.message
        }).code(400)
    }
}

module.exports = [
    {method: 'GET', path: '/todos', handler: todoHandler},
    {method: 'POST', 
    path: '/todo',
    options: {
            validate: {
                payload: {
                    titleReq: Joi.required(),
                    descriptionReq: Joi.required(),
                    userIdReq: Joi.required(),
                    completedReq: Joi.number().min(0).max(1).required(),
                    dateReq: Joi.date().required(),
                    emailReq: Joi.string().email().required()       
                }
            }
        },
    
    handler: createTodoHandler},
    {method: 'PUT', 
    path: '/todo/{id}',
    options: {
        validate: {
            payload: {
                titleReq: Joi.required(),
                descriptionReq: Joi.required(),
                completedReq: Joi.number().min(0).max(1).required(),
                dateReq: Joi.date().required(),
                emailReq: Joi.string().email().required()
            }
        }
    },  
    handler: updateTodoHandler},
    {method: 'DELETE', path: '/todo/{id}',handler: deleteTodoHandler}
];