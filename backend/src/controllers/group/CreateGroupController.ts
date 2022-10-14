import { Request, Response } from "express";
import { CreateGroupService } from "../../Services/group/CreateGroupService";

export class CreateGroupController {
    async handle(request: Request, response: Response) {
        const {title} = request.body;

        const service = new CreateGroupService();

        const result = await service.execute({title});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}