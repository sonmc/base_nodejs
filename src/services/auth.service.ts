import { getRepository } from "typeorm";
import { User } from "../infrastructure/schemas/User";

class AuthService {
  userRepo;
  constructor() {
    this.userRepo = getRepository(User);
  }
  async login(firstName: string, email: string) {
    const user = new User();
    user.firstName = firstName;
    user.email = email;
    return this.userRepo.save(user);
  }
}
export default new AuthService();
