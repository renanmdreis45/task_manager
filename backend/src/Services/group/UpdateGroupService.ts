import { groupRepository } from "../../repositories/groupRepository";
import {Group} from "../../entities/group";


type GroupUpdateRequest = {
    id: string;
    title: string;
}

export class UpdateGroupService {
    async execute({id, title}: GroupUpdateRequest): Promise<Group | Error> {
        
        const group = await groupRepository.findOneBy({id: id});

        if(!group) {
            return new Error("Grupo não existe")
        }

        group.title = title ? title : group.title;

        await groupRepository.save(group);

        return group;
    }
}