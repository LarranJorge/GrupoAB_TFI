import morgan from 'morgan';
import fs from 'fs';

const log = fs.createWriteStream('./accesos.log', { flags: 'a' });

export const fileLogger = morgan('combined', { stream: log });