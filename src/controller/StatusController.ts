import {Request, Response} from "express";
import config from "../config/config";

class  StatusController {
    static ping = async (req: Request, res: Response) => {
        res.status(config.HTTP_CODES.OK).send({message: "Server is up and running!", data : {ping: 1}});
    };
}

export default StatusController;
