import { User } from "../schema/user"
import { createToken } from "../tools/validadeUser"
import { hashPassword } from "../tools/passwordEncoder"

export const signUpUser = async (name, email, password) => {
  const passwordHash = await hashPassword(password);
  const user = await User.findOne({ name: name, email: email, password: passwordHash });

  if (user) {
    return { token: null }
  }

  await User.create({ name: name, email: email, password: passwordHash })
  return createToken(name, email)
}