import { verifyToken } from "../tools/validadeUser";

type TokenType = {
	name: string,
	email: string
}

export const autoLogin = async (token) => {
	const tokenDecoded: TokenType = verifyToken(token);

	if (!tokenDecoded) {
    	return
  	}
  	
   	return { name: tokenDecoded.name, email: tokenDecoded.email }
}