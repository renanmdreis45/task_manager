import { Request, Response } from 'express'
import { groupRepository } from '../repositories/groupRepository'
import { taskRepository } from '../repositories/taskRepository'


export class GroupController {
    async createGroup(req: Request, res: Response) {
        const {title} = req.body

        try {
            const newGroup = groupRepository.create({title})
            await groupRepository.save(newGroup)

            return res.status(201).json(newGroup);
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao criar grupo'})
        }
    }

    async deleteGroup(req: Request, res: Response) {
        
        const idGroup = req.params.id

        try {
          const group = await groupRepository.findOneBy({id: Number(idGroup)})

          if(!group) {
            return res.status(404).json({message: 'Grupo não existe'})
          }

          await groupRepository.delete(group)

          return res.status(201).json({message: 'Grupo deletado com sucesso'})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao deletar o grupo'})
        }
    
    }

    async updateGroup(req: Request, res: Response) {
        const titleGroup = req.body;
        const idGroup = req.params.id;
        
        try {
            const group = await groupRepository.findOneBy({id: Number(idGroup)});

            if(!group) {
                return res.status(404).json({message: 'Grupo não existe'})
            }

            group.title = titleGroup ? titleGroup : group.title; 

            await groupRepository.save(group);

            return res.status(201).json({message: 'Grupo atualizado com sucesso'})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao atualizar grupo'})
        }
    }

    async getGroups(req: Request, res: Response) {
        try {
            const groups = await groupRepository.find({
                relations: {
                    tasks: true,
                },
            })

            return res.json(groups);
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao carregar os grupos'})
        }

    }
}