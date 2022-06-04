import * as crypto from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
    return crypto.pbkdf2Sync(password, process.env.KEY, 1000, 64, `sha512`).toString(`hex`);
}