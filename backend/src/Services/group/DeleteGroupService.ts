import { groupRepository } from "../../repositories/groupRepository";

export class DeleteGroupService {
    async execute(id: string) {
        
        if(!await groupRepository.findOneBy({id: id})){
            return new Error("Grupo não existe");
        }

        await groupRepository.delete(id);
    }
} 