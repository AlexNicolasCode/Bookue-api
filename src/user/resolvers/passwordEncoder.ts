import { createHash } from "crypto";

export const hashPassword = (password) => {
	return createHash('sha256').update(password).digest('base64');
} 