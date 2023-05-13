import { getUserNameByToken } from '../../util/bcrypt.util';
import userService from '../../services/user.service';

class UserFlow {
    async getCurrentUser(acccess_token: string) {
        const username = getUserNameByToken(acccess_token);
        const { status, result } = await userService.getUserByUsername(username);
        return { status, result };
    }

    async getAllUser() {
        const { status, result } = await userService.getAllUser();
        return { status, result };
    }
}

export default new UserFlow();
