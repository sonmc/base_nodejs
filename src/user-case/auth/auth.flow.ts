import { generateToken } from "../../services/bcrypt.service";
import authService from "../../services/user.service";

class AuthFlow {
  async login(username: string, password: string) {
    const user = await authService.login(username, password);
    const payload = { username: user.username };
    const secretKey = process.env.JWT_SECRET || "";
    const expiresIn = process.env.JWT_EXPIRATION_TIME + "s";
    const accessToken = await generateToken(payload, secretKey, expiresIn);
    const secretKeyRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRET || "";
    const expiresInForRefreshToken =
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + "s";
    const refreshToken = await generateToken(
      payload,
      secretKeyRefreshToken,
      expiresInForRefreshToken
    );
    await authService.setRefreshToken(refreshToken, username);
    await authService.updateLoginTime(user.username);
    return { accessToken, refreshToken };
  }
}

export default new AuthFlow();
