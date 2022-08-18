import {Router} from 'express';
import AuthController from '../controller/AuthController';
import {checkJwt} from '../middlewares/checkJwt';
import EventController from "../controller/EventController";

const router = Router();

router.post('/', [/*checkJwt*/], EventController.createEvent);
router.get('/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', [/*checkJwt*/], EventController.getSingleEvent);
router.get('/all', [/*checkJwt*/], EventController.listAllEvents);

export default router;

