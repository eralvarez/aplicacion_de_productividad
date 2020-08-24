import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { config } from '@env/config';
import * as apiResponse from '@shared/services/response/apiResponse';
import { routes as v1Routes } from './v1/routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // here we add all the custom headers we want to use with Angular
    // res.header('Access-Control-Expose-Headers', 'Search-Count');
    next();
});

app.use('/api/v1', v1Routes);

app.get('/*', (req: Request, res: Response) => {
    apiResponse.notFound(res);
});

const server = app.listen(config.server.port, () => {
    const line = (new Array(80)).join('_');
    console.info(line);
    console.info(`Express server running at http://localhost:${config.server.port}`);
    console.info('  > start: ' + new Date());
    console.info(line + '\n');
});

module.exports = server;
