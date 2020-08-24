import * as devEnv from './development';
import * as prodEnv from './production';
import { IConfig } from './config.interface';

const config: IConfig = (process.env.NODE_ENV === 'production') ? prodEnv.config : devEnv.config;

export { config };
