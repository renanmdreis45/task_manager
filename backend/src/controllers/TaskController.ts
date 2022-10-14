;import { group } from 'console';
import {Request, Response} from 'express'
import { Delete } from 'react-feather';
import { Repository } from 'typeorm';
import { groupRepository } from '../repositories/groupRepository'
import { taskRepository } from '../repositories/taskRepository'


export class TaskController {

    async getTasks(req: Request, res: Response) {
        
        try {
            const tasks = await taskRepository.find({
                relations: {
                    group: true,
                },
           });
            return res.json(tasks);
        } catch(error) {
            return res.status(500).json({message: "Erro ao carregar as tarefas"});
        }

    }

    async getTask(req: Request, res: Response) {

        const {idTask} = req.params;

        try {
            const task = await taskRepository.findOneBy({id: idTask});

            if(!task) {
                return res.status(404).json({message: "Tarefa não encontrada no grupo"})
            }

            return res.json(task);

        } catch(error) {
            return res.status(500).json({message:"Erro ao retornar tarefa especificada"})
        }
    }

    async createTask(req: Request, res: Response) {
        const {desc, state, prazo} = req.body;
        const {idGroup} = req.params;

        try {
            
            const groupTask = await groupRepository.findOneBy({id: idGroup});

            if(!groupTask) return res.status(404).json({message:'Grupo inexistente'});

            if(!desc || !state || !prazo) {
                return res.status(404).json({message: 'Parâmetros inválidos ao criar tarefa'});
            }

            const newTask = taskRepository.create({
                desc,
                state,
                prazo,
            })



            await taskRepository.save(newTask)

            return res.status(201).json(newTask)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao criar nova task'})
        }
    }

    async deleteTask(req: Request, res: Response) {
        
        const { idTask } = req.params;

        try {


            const del = await taskRepository.delete({id: idTask})

            if (del.affected === 0) return res.status(404).json({ message: "Tarefa não encontrada" });

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
            const task = await taskRepository.findOneBy({id: idTask})

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