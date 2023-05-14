import { generateAccessToken, generateRefreshToken, getUserNameByToken, compare } from 'util/bcrypt.util';
import authService from 'services/auth.service';

class AuthFlow {
    async login(username: string, password: string) {
        const { status, result } = await authService.getUser(username);

        if (status === 'error') {
            return { status, result: {} };
        }
        const isMatched = await compare(password, result.password);
        if (!isMatched) {
            return { status, result: {} };
        }
        const payload = { username: username };
        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        await authService.setRefreshToken(refreshToken, username);
        await authService.updateLoginTime(username);
        return { status: 'success', result: { accessToken, refreshToken } };
    }

    async refreshToken(refresh_token: string) {
        const username = getUserNameByToken(refresh_token);
        const payload = { username: username };
        const accessToken = await generateAccessToken(payload);
        return { status: 'success', result: { accessToken } };
    }
}

export default new AuthFlow();
