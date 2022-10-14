import { taskRepository } from "../../repositories/taskRepository";

export class DeleteTaskService {
    async execute(id: string) {
        
        if(!await taskRepository.findOneBy({id: id})){
            return new Error("Grupo não existe");
        }

        await taskRepository.delete(id);
    }
} 