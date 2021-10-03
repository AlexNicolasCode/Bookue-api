import { verifyToken } from "../tools/validadeUser";

type UserType = {
	name: string,
	email: string
}

export const autoLogin = async (token) => {
	const user: any = verifyToken(token);

	if (!user) {
    	return
  	}
  	
   	return { name: user.name, email: user.email }
}