import {Request, Response} from "express";
import {EventRequest} from "../request/Event/EventRequest";
import {validate} from "class-validator";
import config from "../config/config";
import {getRepository} from "typeorm";
import {Event} from "../entity/Events/Event";

class EventController {
    static createEvent = async (req: Request, res: Response) => {
        const eventRequest: EventRequest = new EventRequest();
        eventRequest.name = req.body.name;
        eventRequest.date = req.body.date;
        eventRequest.factor = req.body.factor;
        eventRequest.winners = req.body.winners;

        const validatedData = await validate(eventRequest);
        if (validatedData.length > 0) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({message: 'Error en la petición.', data: validatedData});
            return;
        }

        const eventRepository = getRepository(Event);
        let event: Event = new Event();
        event.name = eventRequest.name;
        event.date = eventRequest.date;
        event.factor = eventRequest.factor;
        event.winners = eventRequest.winners;

        try {
            await eventRepository.save(event);
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'No se pudo crear el evento, intenet más tarde.',
                data: e
            });
            return;
        }

        res.status(config.HTTP_CODES.OK).send({message: 'Evento creado exitosamente.', data: event});
        return;
    }

    static listAllEvents = async (req: Request, res: Response) => {
        const eventRepository = getRepository(Event);
        let allEvents: Event[];

        try {
            allEvents = await eventRepository.find();
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Hubo un error obteniendo el listado de eventos. Intente más tarde..',
                data: e
            });
            return;
        }
        res.status(config.HTTP_CODES.OK).send({message: '', data: allEvents});
        return;
    };

    static getSingleEvent = async (req: Request, res: Response) => {
        let eventId = req.params.id;
        if (!eventId) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Debe indicar un id de evento.',
                data: null
            });
            return;
        }

        const eventRepository = getRepository(Event);
        let events: Event[];

        try {
            events = await eventRepository.find({id: eventId});
            if (events.length === 0) {
                res.status(config.HTTP_CODES.NOT_FOUND).send({
                    message: 'No existe el evento.',
                    data: null
                });
                return;
            }
        } catch (e) {
            res.status(config.HTTP_CODES.BAD_REQUEST).send({
                message: 'Hubo un error obteniendo el evento.',
                data: e
            });
            return;
        }
        res.status(config.HTTP_CODES.OK).send({message: '', data: events[0]});
        return;
    };
}

export default EventController;
