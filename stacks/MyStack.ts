import { StackContext, Api, EventBus, Table } from "sst/constructs";

// stack - contains a group of constructs 
export function API({ stack }: StackContext) {



  const table = new Table(stack, "todos", {
    fields: {
      id: "string",
      text: "string",
      status: "string",
    },
    primaryIndex: {
      partitionKey: "id"
    }
  });

  // construct 
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table],
        permissions: [
          `dynamodb:PutItem`, 
          `dynamodb:DeleteItem`, 
          `dynamodb:UpdateItem`, 
          `dynamodb:GetItem`, 
        ],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "GET /todo/{id}": "packages/functions/src/todo.getTodo",
      "POST /todo": "packages/functions/src/todo.create",
      "PUT /todo/{id}": "packages/functions/src/todo.update",
      "DELETE /todo/{id}": "packages/functions/src/todo.remove"
    },
  });



  stack.addOutputs({
    ApiEndpoint: api.url,
  });


}
