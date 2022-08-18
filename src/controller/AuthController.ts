import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
//import {User} from "../entity/Users/User";
import config from "../config/config";
import * as randomstring from 'randomstring';
import EmailParser from "./EmailParser";
import {LoginRequest} from "../request/Auth/LoginRequest";

class AuthController {
    static login = async (req: Request, res: Response) => {
        let loginData: LoginRequest = new LoginRequest();
        loginData.email = req.body.email;
        loginData.password = req.body.password;

        let validated = await validate(loginData)

        if (validated.length > 0) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({message: 'Error en la petición.', data: validated});
            return;
        }

        if (!(loginData.email === "mercadeo@credicorpsa.com" && loginData.password === "Credicorp2022@")) {
            res.status(config.HTTP_CODES.UNAUTHORIZED).send({message: 'Credenciales incorrectas.', data: null});
            return;
        }

        res.status(config.HTTP_CODES.OK).send({
            token: "Login Correcto",
            data: "Login Correcto"
        });
        return;
    };

    static checkJWT = async (req: Request, res: Response) => {
        res.status(config.HTTP_CODES.OK).send({
            token: "Login Correcto",
            data: "Login Correcto"
        });
        return;
    };

    /*
    static changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId;
        const {oldPassword, newPassword} = req.body;

        if (!(oldPassword && newPassword)) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({message: "Información incompleta.", data: null});
            return;
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.createQueryBuilder('user')
                .where('user.id = :id', {id})
                .addSelect('user.password')
                .getOne();
        } catch (id) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({message: "Usuario no existe.", data: null});
            return;
        }

        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(config.HTTP_CODES.UNAUTHORIZED).send({message: "Contraseña incorrecta.", data: null});
            return;
        }

        user.password = newPassword;
        user.phone = '';
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send(errors);
            return;
        }

        user.hashPassword();
        await userRepository.save(user);
        res.status(config.HTTP_CODES.OK).send({message: "Contraseña actualizada correctamente.", data: null});
    };

    static recoverPassword = async (req: Request, res: Response) => {
        const userMail = req.body.userEmail;
        const userRepo = getRepository(User);
        let user: User = await userRepo.findOne({where: {email: userMail}});
        let newGeneratedPassword = randomstring.generate(7);
        if (user) {
            user.password = newGeneratedPassword;
            user.hashPassword();

            const mailBody = await EmailParser.getEmailString('new-password', [
                {word: '{{userName}}', replacement: user.name},
                {word: '{{newPassword}}', replacement: newGeneratedPassword}
            ]);

         await MailerController.sendMail({name: 'STAT', Email: 'info@stat.gt'}, [{
                Name: user.name,
                Email: user.email
            }], 'Nueva contraseña STAT', '', mailBody);

            await userRepo.save(user);
        }
        res.status(config.HTTP_CODES.OK).send({
            message: "Si el correo está registrado, recibirá un correo con el cambio de contraseña.",
            data: null
        });
        return;
    };

    static checkRoles = async (req: Request, res: Response) => {
        let roles: Array<number> = req.body.roles;
        const id = res.locals.jwtPayload.userId;
        if (!roles) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send();
        }
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id)
        } catch (e) {
            res.status(config.HTTP_CODES.UNAUTHORIZED).send(e);
        }

        if (roles.indexOf(user.role) > -1) {
            res.status(config.HTTP_CODES.OK).send(true);
            return;
        }
        res.status(config.HTTP_CODES.OK).send(false);
    };

    static unAssignPlayerId = async (req: Request, res: Response) => {
        const currentUser = res.locals.currentUser;
        const userRepo = getRepository(User);
        currentUser.player_id = null;
        await userRepo.save(currentUser);
        res.status(config.HTTP_CODES.OK).send({
            message: 'Dessuscrito exitosamente',
            data: null
        });
        return;
    };*/
}

export default AuthController;
