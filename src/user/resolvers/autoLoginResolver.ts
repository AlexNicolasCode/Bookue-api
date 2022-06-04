import { verifyToken } from "../tools/validadeUser";

export const autoLogin = async (token) => {
	const user: any = verifyToken(token);

	if (!user) {
    	return
  	}
  	
   	return { name: user.name, email: user.email }
}