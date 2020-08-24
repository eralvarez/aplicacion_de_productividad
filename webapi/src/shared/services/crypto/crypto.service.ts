import { pbkdf2Sync } from 'pbkdf2';
import { config } from '@env/config';

function hash(stringToHash: string) {
    const iterations = 10000;
    const hash = pbkdf2Sync(stringToHash, config.randomSalt, iterations, 40, 'sha512').toString('hex');

    return hash;
}

export {
    hash,
};
