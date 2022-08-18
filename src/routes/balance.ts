import {Router} from 'express';
import AuthController from '../controller/AuthController';
import {checkJwt} from '../middlewares/checkJwt';
import EventController from "../controller/EventController";
import BalanceController from "../controller/BalanceController";

const router = Router();

//router.post('/', [/*checkJwt*/], EventController.createEvent);
//router.get('/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', [/*checkJwt*/], EventController.getSingleEvent);
router.get('/all', [/*checkJwt*/], BalanceController.listAllBalances);
router.post('/Winners', [/*checkJwt*/], BalanceController.pickWinners);

export default router;

