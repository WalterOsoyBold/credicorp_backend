import * as Cloud from '@google-cloud/storage';
import * as path from 'path';
import {Request} from "express";

const serviceKey = path.join(__dirname, './alpine-furnace-298622-26a1ae864de9.json');
const {Storage} = Cloud;


export default {
    //app jwt config
    jwtSecret: '@QEGTUI',
    jwtExpires: '400h',
    roles: {
        PROVIDER: 1,
        DOCTOR: 2,
        ADMIN: 3,
        DOCTOR_ASSISTANT: 4
    },
    HTTP_CODES: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409
    },
    mailJetData: {
        MJ_APIKEY_PUBLIC: '340ed9074aed64f7052bb6f5e027ee1b',
        MJ_APIKEY_PRIVATE: '8ee917b3adf8d51078a2da8bada9fd9f'
    },
    tokens: {
        lasting: 5,
        status: {
            NON_CONFIRMED: 0,
            CONFIRMED: 1,
            INVALIDATED: 2
        }
    },
    users: {
        ROLES: {
            ADMIN: 0,
            PROVIDER: 1,
            DOCTOR: 2
        }
    },
    mailing: {
        CONTACT_MAIL: 'info@stat.gt',
        CONTACT_NAME: 'STAT APP'
    },
    productScheduleStatus: {
        ORDERED: 0,
        APPROVED: 1,
        REJECTED: 2
    },
    doctorInvitedStatus: {
        INVITED: 0,
        ACCEPTED: 1,
        REJECTED: 2
    },
    scheduleStatus: {
        CREATED: 1,
        COMPLETED: 2,
        DELETED: 3
    },
    storage: new Storage({
        keyFilename: serviceKey,
        projectId: 'apt-icon-275103'
    }),
    oneSignal: {
        apiKey: 'MTQzODRkMDItY2YzYi00ZTg0LTgwNzctMmFhMDgzMTZhMGNl',
        appId: '70f343df-ca86-4096-be17-85c282b137d3'
    },
    validators: {
        email: (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
};

interface MulterRequest extends Request {
    file: any;
}
