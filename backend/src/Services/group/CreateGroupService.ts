import { idText } from "typescript";
import { Group } from "../../entities/group";
import { groupRepository } from '../../repositories/groupRepository'


type GroupRequest = {
    title: string;
}


export class CreateGroupService {
    async execute({title}: GroupRequest): Promise<Group | Error> {

        if(await groupRepository.find({
            where: {
                title,
            }
        })) {
            return new Error("Grupo já existe");
        }
        
        const newGroup = groupRepository.create({title})

        await groupRepository.save(newGroup);
        
        return newGroup;
    }
}