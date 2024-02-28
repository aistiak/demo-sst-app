import { ApiHandler } from "sst/node/api";
import { Todo } from "@demo-sst-app/core/todo";
import { TodoRepository } from '@demo-sst-app/core/repository/todo';
import { RequestValidator } from '@demo-sst-app/core/src/validaton/todo';

export const create = ApiHandler(async (_evt) => {

  const body = JSON.parse(_evt.body as string) as any
  const { success, errors } = RequestValidator('create', body);
  if (!success) return {
    statusCode: 400,
    body: JSON.stringify(errors)
  }
  const todo = await TodoRepository.createTodo(body)
  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo)
  };

});

export const list = ApiHandler(async (_evt) => {
  const list = await TodoRepository.listTodo()
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  };
});
export const getTodo = ApiHandler(async (_evt :any) => {
  const id = _evt.pathParameters.id 
  const todo = await TodoRepository.getTodo(id)
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  };
});

export const update = ApiHandler(async (_evt: any) => {
  
  
  const body = JSON.parse(_evt.body as string) as any
  const { success, errors } = RequestValidator('update', body);

  if (!success) return {
    statusCode: 400,
    body: JSON.stringify(errors)
  }

  const id = _evt.pathParameters.id
  await TodoRepository.updateTodo(id, body)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body :JSON.stringify({message : 'todo updated'})
  }
});

export const remove = ApiHandler(async (_evt: any) => {


  const id = _evt.pathParameters.id
  if (!id) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: 'todo id required for operation' }),
    };
  }

  await TodoRepository.removeTodo(id)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body :JSON.stringify({message : 'todo removed'})
  }


});



