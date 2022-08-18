import {Router} from "express";
import UserController from "../controller/UserController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checRole";
import config from "../config/config";


const routes = Router();
/*
//Get all routes
routes.get('/', [checkJwt, checkRole([config.roles.ADMIN, config.roles.DOCTOR, config.roles.PROVIDER]), UserController.listAll]);
// get one user
routes.get('/:id([0-9]+)', [checkJwt, checkRole([config.roles.ADMIN, config.roles.DOCTOR, config.roles.PROVIDER, config.roles.DOCTOR_ASSISTANT])], UserController.getOneById);
//Create a new user
routes.post('/', [], UserController.newUser);
//Edit one user
routes.post('/edit', [checkJwt, checkRole([config.roles.ADMIN, config.roles.DOCTOR, config.roles.PROVIDER])], UserController.editUser);
// Delete one user
routes.delete('/:id([0-9]+)', [checkJwt, checkRole([config.roles.ADMIN, config.roles.DOCTOR, config.roles.PROVIDER])], UserController.deleteUser);
// Confirm user
routes.post('/confirm', [], UserController.confirmEmail);
//resend token to mail
routes.post('/resend-confirm-code', [], UserController.reSendConfirmEmail);
//assistant invitation
routes.post('/assistant', [checkJwt, checkRole([config.roles.DOCTOR])], UserController.sendInvitation);
//doctor list
routes.get('/doctor/list', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT], true)], UserController.getDoctors);

routes.post('/photo', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.PROVIDER, config.roles.ADMIN, config.roles.DOCTOR_ASSISTANT])], UserController.changeUserProfilePhoto);

routes.post('/photo-base-64', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.PROVIDER, config.roles.DOCTOR_ASSISTANT])], UserController.changeUserProfilePhotoBase64);

routes.post('/contact', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT], true)], UserController.addDoctorContact);

routes.post('/doctor/search', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT], true)], UserController.searchDoctor);

routes.get('/contacts', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT], true)], UserController.getContacts);

routes.delete('/contact/:contactId([0-9]+)', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT], true)], UserController.removeContact);

routes.post('/send-invitation', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT], true)], UserController.sendInvitation);

routes.post('/send-assistant-invitation', [checkJwt, checkRole([config.roles.DOCTOR])], UserController.inviteAssistant);

routes.delete('/delete-assistant', [checkJwt, checkRole([config.roles.DOCTOR])], UserController.deleteAssistant);

routes.post('/change-email', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.PROVIDER, config.roles.DOCTOR_ASSISTANT])], UserController.changeEmail);

routes.post('/edit-doctor-data', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.DOCTOR_ASSISTANT])], UserController.editDoctorData);

routes.get('/refresh', [checkJwt, checkRole([config.roles.DOCTOR, config.roles.PROVIDER, config.roles.ADMIN, config.roles.DOCTOR_ASSISTANT])], UserController.refreshUser);

*/


export default routes;
