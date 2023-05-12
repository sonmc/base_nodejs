import authService from "../../../services/auth.service";

class LoginFlow {
  async login(username, password) {
    const token = await authService.login(username, password);
    return token;
  }
}

export default new LoginFlow();
