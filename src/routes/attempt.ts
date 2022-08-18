import {Router} from 'express';
import AuthController from '../controller/AuthController';
import {checkJwt} from '../middlewares/checkJwt';
import EventController from "../controller/EventController";
import BalanceController from "../controller/BalanceController";

const router = Router();

router.post('/generate', [/*checkJwt*/], BalanceController.generateAttempts);
router.get('/all/:eventId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', [/*checkJwt*/], BalanceController.getAllAttempts);

export default router;

