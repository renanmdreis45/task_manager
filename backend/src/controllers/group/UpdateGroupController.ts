import { Request, Response} from "express";
import { UpdateGroupService } from "../../Services/group/UpdateGroupService";


export class UpdateGroupController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const { title } = request.body;

        const service = new UpdateGroupService();

        const result = await service.execute({id, title})

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}