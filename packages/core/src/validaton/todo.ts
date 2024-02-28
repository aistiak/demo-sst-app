import {date, z} from 'zod' ;

const createTodoSchema = z.object({
    text : z.string().min(3).max(300),
    status : z.enum(['pending','done']).default('pending')
})


const updateTodoSchema = z.object({
    text : z.string().min(3).max(300).optional(),
    status : z.enum(['pending','done']).default('pending').optional()
})


const _map = {
    'create' : createTodoSchema  ,
    'update' : updateTodoSchema 
}

export const RequestValidator = (type : "create" | "update", data : any) => {

    try {
        const schema = _map[type] 
        const validatedUser = schema.parse(data);
        return {success :  true }
    }catch(error :any){

        return {
            success : false ,
            errors :  error.errors 
        }
    }
}