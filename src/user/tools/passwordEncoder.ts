import { createHash } from "crypto";

export const hashPassword = (password: string) => {
	return createHash('sha256').update(`${password}${process.env.PASSWORD_KEY}`).digest('hex');
} 