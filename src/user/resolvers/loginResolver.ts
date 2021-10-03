import { User } from "../schema/user"
import { createToken } from "../tools/validadeUser";
import { hashPassword } from "./passwordEncoder";

type UserType = {
  name: string,
  email: string
}

export const loginUser = async (name: string, email: string, password: string) => {
  const user = await User.findOne({ name: name, email: email, password: hashPassword(password) });

  if (!user) {
    return { token: null }
  }

  return createToken(name, email)
}