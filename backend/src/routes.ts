import {Router} from 'express'
import { GroupController } from './controllers/GroupController';

const routes = Router()

routes.post('/groups', new GroupController().create); 

export default routes;
