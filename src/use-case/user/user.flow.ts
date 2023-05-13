import { getUserNameByToken } from '../../util/bcrypt.util';

import userService from '../../services/user.service';

class UserFlow {
    async getCurrentUser(acccess_token: string) {
        const username = getUserNameByToken(acccess_token);
        const { status, result } = await userService.getUserByUsername(username);
        return result;
    }
}

export default new UserFlow();
