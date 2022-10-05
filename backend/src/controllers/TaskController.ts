import {Request, Response} from 'express'
import { Delete } from 'react-feather';
import { groupRepository } from '../repositories/groupRepository'
import { taskRepository } from '../repositories/taskRepository'

export class TaskController {
    async deleteTask(req: Request, res: Response) {
        
        const { idGroup } = req.body
        const { idTask } = req.params;

        try {
            const groupTask = await groupRepository.findOne({
                where: {
                    id: Number(idGroup),
                }
            })
               
            if(!groupTask) {
                return res.status(404).json({message: 'Grupo não existe'})
            }

            const task = await taskRepository.findOne({
                where: {
                    group: groupTask,
                    id: Number(idTask),
                }
            })

            if(!task) {
                return res.status(404).json({message: 'Tarefa não existe nesse grupo'})
            }

            await groupRepository.delete(task)
            return res.status(201).json({message: 'Tarefa deletada com sucesso'})

        } catch(error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao deletar tarefa desse grupo'})
        }
    }


    async updateTask(req: Request, res: Response) {

        const { idGroup } = req.body
        const { idTask } = req.params;
      
    }
}