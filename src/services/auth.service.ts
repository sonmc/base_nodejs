import { getRepository } from "typeorm";
import { compare, hash } from "./bcrypt.service";
import { User } from "infrastructure/schemas/user.schema";

class AuthService {
  async login(username: string, password: string) {
    const userRepo = getRepository(User);
    const user = (await userRepo.findOne({
      where: {
        username: username,
      },
    })) as User;
    const isMatched = await compare(password, user.password);
    if (user && isMatched) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  }

  async updateLoginTime(username: string) {
    const userRepo = getRepository(User);
    const user = (await userRepo.findOne({
      where: {
        username: username,
      },
    })) as User;
    user.email = new Date().toDateString();
    await userRepo.save(user);
  }

  async setRefreshToken(refreshToken: string, username: string) {
    const userRepo = getRepository(User);
    const user = (await userRepo.findOne({
      where: {
        username: username,
      },
    })) as User;
    const currentHashedRefreshToken = await hash(refreshToken);
    user.hash_refresh_token = currentHashedRefreshToken;
    await userRepo.save(user);
  }
}

export default new AuthService();
