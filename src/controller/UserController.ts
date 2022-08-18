import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import EmailParser from './EmailParser';
import config from "../config/config";
import {Like} from "typeorm";
import * as randomstring from 'randomstring';
import {isNumber} from "util";

interface MulterRequest extends Request {
    file: any;
}

class UserController {

    static getCode = () => {
        return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
    };

    static validateTokenAvailability = (date: Date): number => {
        const oneDay = 24 * 60 * 60 * 100;
        const firstDate = date;
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
        console.log('Difference Days: ' + diffDays);
        return diffDays;
    };

    static refreshUser = async (req: Request, res: Response) => {
        res.status(config.HTTP_CODES.OK).send({
            message: 'Se ha guardado la información correctamente.',
            data: {user: res.locals.currentUser, token: res.getHeader('token')}
        });
        return;
    };
}

export default UserController;
