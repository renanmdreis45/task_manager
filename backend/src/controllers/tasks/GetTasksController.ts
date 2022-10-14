import {Request, Response} from 'express'
import { GetTasksService } from '../../Services/task/GetTasksService';

export class GetTasksController {
    async handle(request: Request, response: Response) {
        const service = new GetTasksService();

        const groups = await service.execute();

        return response.json(groups);
    }
}