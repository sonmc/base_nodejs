import flow from "./auth.flow";

export async function login(req: any, res: any, next: any) {
  const { username, password } = req.body;
  const token = await flow.login(username, password);

  res.cookie("access-token", token.accessToken);
  res.cookie("refresh-token", token.refreshToken);
  res.send("cookie sent");
}

export async function logout(req: any, res: any, next: any) {
  res.cookies("access-token", null, { maxAge: 0 });
}

// export async function refreshToken(req, res, next) {
//     const refresh_token = req.cookies.get('refresh-token') || '';
//     const accessToken = await flow.refreshToken(refresh_token);
//     res.cookies.set('access-token', accessToken, {
//         httpOnly: true,
//     });
// }
export default { login, logout };
