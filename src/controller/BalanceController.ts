import { Request, Response } from "express";
import { getRepository } from "typeorm";
import config from "../config/config";
import { BalanceRegistry } from "../entity/Balance/BalanceRegistry";
import { GenerateAttemptsRequest } from "../request/Balance/GenerateAttemptsRequest";
import { validate } from "class-validator";
import { Attempt } from "../entity/Raffles/Attempt";
import { AttemptStatus } from '../entity/Raffles/AttemptStatus';
import { v4 as uuidv4 } from 'uuid';
import { PickWinnerRequest } from "../request/Winner/PickWinnerRequest";
import { Winner } from "../entity/Winners/Winner";

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
class BalanceController {
    static listAllBalances = async (req: Request, res: Response) => {
        let balanceRegistryList: BalanceRegistry[];
        const balanceRegistryRepository = getRepository(BalanceRegistry);
        try {
            balanceRegistryList = await balanceRegistryRepository.find();
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({ message: 'Error obteniendo la información.', data: e });
            return;
        }

        res.status(config.HTTP_CODES.OK).send({
            message: "",
            data: balanceRegistryList
        });
        return;
    };

    static generateAttempts = async (req: Request, res: Response) => {
        let generateAttemptsRequest: GenerateAttemptsRequest = new GenerateAttemptsRequest();
        generateAttemptsRequest.evt = req.body.evt;

        const validatedRequest = await validate(generateAttemptsRequest);
        if (validatedRequest.length > 0) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({ message: 'Error obteniendo la información.', data: null });
            return;
        }

        let balanceRecords: BalanceRegistry[];

        const balanceRegistryRepository = getRepository(BalanceRegistry);

        try {
            balanceRecords = await balanceRegistryRepository.find({
                join: {
                    alias: 'balance',
                    innerJoin: { evt: 'balance.event' }
                },
                where: qb => {
                    qb.where('evt.id = :eventId', { eventId: generateAttemptsRequest.evt.id })
                }
            })
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({ message: 'Error obteniendo la información.', data: e });
            return;
        }

        let attempts: Attempt[] = [];

        for (let i = 0; i < balanceRecords.length; i++) {
            const tmpBalanceRegistry: BalanceRegistry = balanceRecords[i];
            tmpBalanceRegistry.balance = tmpBalanceRegistry.finalBalance - tmpBalanceRegistry.initialBalance;
            if (tmpBalanceRegistry.balance !== 0 && !(tmpBalanceRegistry.balance < generateAttemptsRequest.evt.factor)) {
                const attemptsCT = Math.floor(tmpBalanceRegistry.balance / generateAttemptsRequest.evt.factor);
                tmpBalanceRegistry.attemptsAllowed = attemptsCT;
                for (let o = 0; o < attemptsCT; o++) {
                    let tmpAttempt = new Attempt();
                    tmpAttempt.balanceRegistry = tmpBalanceRegistry;
                    tmpAttempt.date = new Date().getTime();
                    tmpAttempt.status = new AttemptStatus();
                    tmpAttempt.uniqueId = uuidv4();
                    attempts.push(tmpAttempt)
                }
            }
        }
        const attemptsRepository = getRepository(Attempt);
        try {
            await attemptsRepository.save(attempts, { chunk: 1000 });
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Error creando oportunidades de participación.',
                data: e
            });
            return;
        }
        try {
            await balanceRegistryRepository.save(balanceRecords, { chunk: 1000 });
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Error actualizando la informacion de clientes.',
                data: e
            });
            return;
        }
        res.status(config.HTTP_CODES.OK).send({
            message: "Se han generado las oportunidades de rifa exitosamente.",
            data: attempts
        });
        return;
    };

    static getAllAttempts = async (req: Request, res: Response) => {
        const event = req.params.eventId;
        if (!event) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Debe indicar el id del evento.',
                data: null
            });
            return;
        }

        const attemptRepository = getRepository(Attempt);
        let attemptList: Attempt[] = [];
        try {
            attemptList = await attemptRepository.createQueryBuilder('attempt')
                .innerJoinAndSelect('attempt.balanceRegistry', 'balance')
                .innerJoinAndSelect('balance.event', 'event', 'event.id =:eventId', { eventId: event }).getMany();
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Hubo un error obteniendo la información.',
                data: null
            });
            return;
        }
        res.status(config.HTTP_CODES.OK).send({
            message: '',
            data: attemptList
        });
        return;
    };

    static pickWinners = async (req: Request, res: Response) => {
        let pickUpWinnerRequest: PickWinnerRequest = new PickWinnerRequest();
        pickUpWinnerRequest.evt = req.body.evt;
        pickUpWinnerRequest.prize = req.body.prize;
        pickUpWinnerRequest.name = req.body.name;
        const validatedRequest = await validate(pickUpWinnerRequest);
        if (validatedRequest.length > 0) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({ message: 'Error en los datos.', data: null });
            return;
        }

        const attemptRepository = getRepository(Attempt);
        let attemptList: Attempt[] = [];

        try {
            attemptList = await attemptRepository.createQueryBuilder('attempt')
                .innerJoinAndSelect('attempt.balanceRegistry', 'balance')
                .innerJoinAndSelect('balance.event', 'event', 'event.id =:eventId', { eventId: pickUpWinnerRequest.evt.id })
                .where('attempt.status.id = :id', { id: '1' })
                .getMany();
            let winnersSelected: Attempt[] = [];
            for (let index = 0; index < 3; index++) {
                const element = getRandom(attemptList)
                winnersSelected.push(element)
                attemptList = attemptList.filter(data => data.balanceRegistry.accountId != element.balanceRegistry.accountId)
            }

            const status = new AttemptStatus()
            status.id='2'
            status.description=''
            status.name=''
            winnersSelected[0].status =  status
            await attemptRepository.save(winnersSelected[0])
            
            
            res.status(config.HTTP_CODES.OK).send({
                message: 'ganadores',
                data: winnersSelected
            });
            return;
        } catch (error) {
            console.log(error)
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Hubo un error obteniendo la información.',
                data: error
            });
            return;
        }


    };
}

export default BalanceController;
