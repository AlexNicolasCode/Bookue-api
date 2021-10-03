import * as jwt from "jsonwebtoken";

export const createToken = async (name, email) => {
	const userProps = { name: name, email: email };
	const token = jwt.sign(userProps, process.env.KEY, { expiresIn: 60 * 60 * 60 })

	return { token: token }
} 

export const verifyToken = (token) => {
	return jwt.verify(token, process.env.KEY)
}