import { Request, Response} from "express";
import { CreateTaskService } from "../../Services/task/CreateTaskService";


export class CreateTaskController {
    async handle(request: Request, response: Response) {
        const {desc, state, prazo, group_id} = request.body

        const service = new CreateTaskService();

        const result = service.execute({
            desc, 
            state, 
            prazo, 
            group_id
        });

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result);
    }
}