import { groupRepository } from "../../repositories/groupRepository";
import {Group} from "../../entities/group";
import { Task } from "../../entities/tasks";
import { taskRepository } from "../../repositories/taskRepository";


type TaskUpdateRequest = {
    id: string;
    desc: string;
    prazo: string;
    state: string;
}

export class UpdateTaskService {
    async execute({id, desc, prazo, state}: TaskUpdateRequest): Promise<Task | Error> {
    
        const task = await taskRepository.findOneBy({id: id})

        if(!task) {
            return new Error("Task não existe");
        }

        await taskRepository.update(id, {desc: desc, prazo: prazo, state: state});

        await taskRepository.save(task);

        return task;

        
    }
}