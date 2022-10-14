import {Router} from 'express'

import { CreateGroupController } from '../controllers/group/CreateGroupController';
import { GetAllGroupsController } from '../controllers/group/GetAllGroupsController';
import { UpdateGroupController } from '../controllers/group/UpdateGroupController';
import { DeleteGroupController } from '../controllers/group/DeleteGroupController';



import { CreateTaskController } from '../controllers/tasks/CreateTaskController';
import { GetTasksController } from '../controllers/tasks/GetTasksController';
import { UpdateTaskController } from '../controllers/tasks/UpdateTaskController';
import { DeleteTaskController } from '../controllers/tasks/DeleteTaskController';


const routes = Router()

//Grupos
routes.post("/groups", new CreateGroupController().handle);
routes.get('/groups', new GetAllGroupsController().handle);
routes.put('/groups/:id', new UpdateGroupController().handle);
routes.delete('/groups/:id', new DeleteGroupController().handle);

//Tasks
routes.post('/tasks', new CreateTaskController().handle);
routes.get('/tasks', new GetTasksController().handle);
routes.put('/tasks/:id', new UpdateTaskController().handle);
routes.delete('/tasks/:id', new DeleteTaskController().handle);

export default routes;