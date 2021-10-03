const jwt = require("jsonwebtoken");

const key = "test";

export const createToken = async (name, email) => {
	const userProps = { name: name, email: email };
	const token = jwt.sign(userProps, key, { expiresIn: 60 * 60 * 60 })

	return { token: token }
} 

export const verifyToken = (token) => {
	return jwt.verify(token, key)
}