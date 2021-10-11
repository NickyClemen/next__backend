import path from 'path';

import dotenv from 'dotenv';
const ENV_FILE = path.join(__dirname, '../../.env');
dotenv.config({ path: ENV_FILE });

export default class Config {
    public port:number;

    constructor() {
        this.port = Number(process.env.PORT);
    }
}