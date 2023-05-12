import { getUserNameByToken } from '../../util/bcrypt.util';

import userService from '../../services/user.service';

class UserFlow {
    async getCurrentUser(acccess_token: string) {
        const username = getUserNameByToken(acccess_token);
        const user = await userService.getUserByUsername(username);
        return user;
    }
}

export default new UserFlow();
