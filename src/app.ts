import "reflect-metadata";
import { createConnection} from "typeorm";
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import * as multer from 'multer';
import {pagination} from 'typeorm-pagination'



createConnection().then( async () => {
    const app = express();

    const multerMid = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024
        }
    });

    app.use(cors({
        origin: '*'
    }));

    app.use(helmet());

    app.use(multerMid.single('file'));

    app.use(bodyParser.json({limit: '50mb'}));

    app.use(pagination);

    app.use("/api",  routes);

    app.listen(4000, () => {
        console.log('Server started on port 4000');
    });

}).catch(
    error => console.log(error)
);
