import { Request, Response} from "express";
import { UpdateTaskService } from "../../Services/task/UpdateTaskService";


export class UpdateTaskController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const {desc, prazo, state } = request.body;

        const service = new UpdateTaskService();
        const result = await service.execute({id, desc, prazo, state})

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}