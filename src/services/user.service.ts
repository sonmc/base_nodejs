import { getRepository } from "typeorm";
import { User } from "../infrastructure/schemas/User";

class UserService {
  userRepo;
  constructor() {
    this.userRepo = getRepository(User);
  }

  async register(firstName: string, email: string) {
    const user = new User();
    user.firstName = firstName;
    user.email = email;
    return this.userRepo.save(user);
  }
}

export default new UserService();
