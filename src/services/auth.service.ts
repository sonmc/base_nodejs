import { getRepository } from 'typeorm';
import { hash } from '../util/bcrypt.util';
import { User } from '../infrastructure/schemas/user.schema';

class AuthService {
    async getUser(username: string) {
        const userRepo = getRepository(User);
        const user = (await userRepo.findOne({
            where: {
                username: username,
            },
        })) as User;
        if (user) {
            return { status: 'success', result: user };
        } else {
            return { status: 'error', result: new User() };
        }
    }

    async updateLoginTime(username: string) {
        const userRepo = getRepository(User);
        const user = (await userRepo.findOne({
            where: {
                username: username,
            },
        })) as User;
        user.last_login = new Date();
        await userRepo.save(user);
        return { status: 'success', result: user };
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
        userRepo.save(user);
        return { status: 'success', result: user };
    }
}

export default new AuthService();
