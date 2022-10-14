import {Request, Response} from 'express'
import { GetAllGroupsService } from '../../Services/group/GetAllGroupsService'

export class GetAllGroupsController {
    async handle(request: Request, response: Response) {
        const service = new GetAllGroupsService();

        const groups = await service.execute();

        return response.json(groups);
    }
}