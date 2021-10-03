import { User } from "../schema/user"
import { createToken } from "../tools/validadeUser";
import { hashPassword } from "./passwordEncoder";

export const loginUser = async (name, email, password) => {
  const user = await User.findOne({ name: name, email: email, password: hashPassword(password) });

  if (!user) {
    return { token: null }
  }

  return createToken(name, email)
}