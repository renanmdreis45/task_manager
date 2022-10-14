import { Task } from "../../entities/tasks";
import { taskRepository } from "../../repositories/taskRepository";

export class GetTasksService {
    async execute() {
        
        const tasks = await taskRepository.find({
            relations: ["group"],
        });

        return tasks
    }
}