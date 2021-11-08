import { User } from "../schema/user"
import { createToken } from "../tools/validadeUser";
import { hashPassword } from "../tools/passwordEncoder";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email, password: hashPassword(password) });

  if (!user) {
    return { token: null }
  }

  return createToken(user.name, email)
}
