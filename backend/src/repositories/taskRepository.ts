import  AppDataSource  from '../data-source'
import { Task } from '../entities/tasks'

export const taskRepository = AppDataSource.getRepository(Task)