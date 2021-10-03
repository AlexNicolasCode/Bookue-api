import { User } from "../schema/user"
import { createToken } from "../tools/validadeUser"
import { hashPassword } from "./passwordEncoder"

export const signUpUser = async (name, email, password) => {
  const user = await User.findOne({ name: name, email: email, password: hashPassword(password) });

  if (user) {
    return { token: null }
  }

  await User.create({ name: name, email: email, password: hashPassword(password) })

  return createToken( name, email )
}