import { Router } from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

//login route

router.post('/login', AuthController.login);
router.get('/check-jwt', [checkJwt], AuthController.checkJWT);


//Change my password

//router.post('/change-password', [checkJwt, checkRole([config.roles.DOCTOR_ASSISTANT, config.roles.DOCTOR, config.roles.PROVIDER, config.roles.ADMIN])], AuthController.changePassword);

//roles authorization

//router.post( '/roles', [checkJwt], AuthController.checkRoles);

//router.post('/recover-password', [], AuthController.recoverPassword);

//router.post('/unsubscribe-push', [checkJwt, checkRole([config.roles.DOCTOR_ASSISTANT, config.roles.DOCTOR])], AuthController.unAssignPlayerId);

export default router;

