import { Task } from "../../entities/tasks"
import { taskRepository } from "../../repositories/taskRepository";


type TaskRequest = {
    desc: string;
    prazo: string;
    state: string;
    group_id: string;
}

export class CreateTaskService {
    async execute({desc, prazo, state, group_id}: TaskRequest): Promise <Task | Error> {

        const task = taskRepository.create({desc, prazo, state, group_id});
        
        await taskRepository.save(task);

        return task;
    }
}
