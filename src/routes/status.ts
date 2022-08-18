import {Router} from "express";
import StatusController from "../controller/StatusController";

const routes = Router();

routes.get('/ping', [], StatusController.ping);

export default routes;
