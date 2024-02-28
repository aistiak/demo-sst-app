

import DynamoDB from "aws-sdk/clients/dynamodb";
import { Entity } from "electrodb";
import crypto from "crypto";

const client = new DynamoDB.DocumentClient();

const table = "dev-demo-sst-app-todos";

const Todos = new Entity({
    model : {
        service : "basic" ,
        entity : 'todo',
        version : '1'
    },
    attributes : {
        id : {  
            type : 'string' ,
            required : true 
        },
        text : {
            type : 'string',
            required : true 
        },
        status : {
            type : 'string',
            required : true 
        }
    },
    indexes : {
        todos : {
            pk :  {
                field : 'id' ,
                composite : ['id'],
            }
        }
    }
},{ table , client})


export const createTodo = async (data :any) => {

    const {text , status} = data 
    return await Todos.create({
            id : crypto.randomUUID() ,
            text ,
            status
      }).go();
};


export const updateTodo = async (id : string,params : { text?:string ; status? :string }) => {

    await Todos.patch({id}).set(params).go()
}

export const removeTodo = async (id : string) => {

    await Todos.delete({
        'id' :id
    }).go()
}

export const listTodo = async () => {
    const {data} =  await Todos.match({}).go() ;
    return data ;
}

export const getTodo = async (id :string) => {

    return await Todos.get({id}).go()
}


export const TodoRepository = {
    createTodo ,
    updateTodo ,
    removeTodo ,
    listTodo ,
    getTodo
}