import flow from "./login/login.flow";

export async function login(req, res, next) {
  const { username, password } = req.body;
  const token = await flow.login(username, password);
  res.body = token;
  res.sendStatus(201);
}

export async function logout(req, res, next) {}

export default { login, logout };
