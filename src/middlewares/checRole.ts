import {Request, Response, NextFunction} from 'express';
import {getRepository} from "typeorm";
//import {User} from '../entity/Users/User';
import config from "../config/config";


export const checkRole = (roles: Array<number>, switchAssistant: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;
        //Get user role from the database
        //const userRepository = getRepository(User);


        next();

       /* let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(config.HTTP_CODES.UNAUTHORIZED).send();
        }

        res.locals.currentUser = user;

        if(switchAssistant) {
            if (user.assistedId) {
                res.locals.currentUser.id = user.assistedId;
                res.locals.jwtPayload.userId = user.assistedId;
                res.locals.currentUser = await userRepository.findOne(user.assistedId);
            }
        }

        if (roles.indexOf(user.role) > -1) next();
        else res.status(config.HTTP_CODES.UNAUTHORIZED).send({
            message: 'Usted no tiene permiso para acceder a estos datos',
            data: null
        });*/
    }
};
