import { User } from "../schema/user"
import { createToken } from "../tools/validadeUser";
import { hashPassword } from "../tools/passwordEncoder";

export const loginUser = async (email: string, password: string) => {
  const passwordHash = await hashPassword(password);
  const user = await User.findOne({ email: email, password: passwordHash });

  if (!user) {
    return { token: null }
  }

  return createToken(user.name, email)
}
