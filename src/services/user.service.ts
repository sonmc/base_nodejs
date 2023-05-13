import { getRepository } from 'typeorm';
import { User } from '../infrastructure/schemas/user.schema';

class UserService {
    async getUserByUsername(username: string) {
        const userRepo = getRepository(User);
        const user = (await userRepo.findOne({
            relations: ['roles', 'roles.permissions'],
            where: { username: username },
        })) as User;
        return { status: 'success', result: user };
    }
}

export default new UserService();
