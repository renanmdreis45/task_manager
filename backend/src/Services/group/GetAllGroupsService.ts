import { Group } from "../../entities/group";
import { groupRepository } from "../../repositories/groupRepository";


export class GetAllGroupsService {
    async execute() {
        const groups = await groupRepository.find({
            relations: {
                tasks: true,
            },
        });

        return groups
    }
}