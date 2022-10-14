import { Task } from "../../entities/tasks"
import { Group } from "../../entities/group";
import { groupRepository } from "../../repositories/groupRepository";
import { taskRepository } from "../../repositories/taskRepository";
import { report } from "process";

type TaskRequest = {
    desc: string;
    prazo: string;
    state: string;
    group_id: string;
}

export class CreateTaskService {
    async execute({desc, prazo, state, group_id}: TaskRequest): Promise <Task | Error> {
        if(!await groupRepository.findOneBy({id: group_id})) {
            return new Error("Grupo não existe");
        }

        const task = taskRepository.create({desc, prazo, state, group_id});
        
        await taskRepository.save(task);

        return task;
    }
}
