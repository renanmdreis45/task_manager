import { Request, Response } from "express";
import { DeleteTaskService } from "../../Services/task/DeleteTaskService";

export class DeleteTaskController {
    async handle(request: Request, response: Response) {
        const { id } =  request.params;

        const service = new DeleteTaskService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}