import {Router} from 'express';
import auth from './auth';
import user from './user';
import event from './event';
import balance from './balance';
import attempt from './attempt';


const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/event', event);
routes.use('/balance', balance);
routes.use('/attempt', attempt);

export default routes;
