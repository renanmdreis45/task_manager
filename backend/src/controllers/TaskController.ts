;import {Request, Response} from 'express'
import { Delete } from 'react-feather';
import { groupRepository } from '../repositories/groupRepository'
import { taskRepository } from '../repositories/taskRepository'

export class TaskController {

    async getTaks(req: Request, res: Response) {
        
        try {
            const tasks = await taskRepository.find();
            return res.json(tasks);
        } catch(error) {
            return res.status(500).json({message: "Erro ao carregar as tarefas"});
        }

    }

    async getTask(req: Request, res: Response) {

        const {idTask} = req.params;

        try {
            const task = await taskRepository.findOneBy({id: Number(idTask)});

            if(!task) {
                return res.status(404).json({message: "Tarefa não encontrada no grupo"})
            }

            return res.json(task);

        } catch(error) {
            return res.status(500).json({message:"Erro ao retornar tarefa especificada"})
        }
    }

    async deleteTask(req: Request, res: Response) {
        
        const { idTask } = req.params;

        try {

            const task = await taskRepository.findOne({
                where: {
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

        const { idTask } = req.params;
        const {descTask, stateTask, prazoTask} = req.body;
        
        try {
            const task = await taskRepository.findOneBy({id: Number(idTask)})

            if(!task) {
                return res.status(404).json({message: "Tarefa não existe nesse grupo"})
            }

            await taskRepository.update(Number(idTask), {desc:descTask, state: stateTask, prazo: prazoTask})

            const taskUpdate = await taskRepository.save(task);

            return res.json(taskUpdate);

        } catch(error) {
            return res.status(500).json({message: "Erro ao atualizar tarefa"})
        }
        
    }
}