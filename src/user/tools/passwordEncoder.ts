import { createHmac } from "crypto";

export const hashPassword = (password: string) => {
	return createHmac("sha256", process.env.KEY_PASSWORD).update(password).digest('hex');
} 