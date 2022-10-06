import {Router} from 'express'
import { GroupController } from '../controllers/GroupController';
import { TaskController } from '../controllers/TaskController';


const routes = Router()

routes.post('/groups', new GroupController().createGroup);
routes.post('/groups/:id/tasks', new TaskController().createTask);

routes.get('/groups', new GroupController().getGroups);
routes.get('/tasks', new TaskController().getTasks);
routes.get('/tasks/:id', new TaskController().getTask);

routes.put('/groups/:id', new GroupController().updateGroup);
routes.put('/tasks/:id', new TaskController().updateTask);

routes.delete('/groups/:id', new GroupController().deleteGroup);
routes.delete('/tasks/:id', new TaskController().deleteTask);

export default routes;