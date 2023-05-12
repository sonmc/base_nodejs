import flow from './auth.flow';

export async function login(req: any, res: any, next: any) {
    const { username, password } = req.body;
    const token = await flow.login(username, password);

    res.cookie('access-token', token.accessToken);
    res.cookie('refresh-token', token.refreshToken);
    res.sendStatus(200);
}

export async function logout(req: any, res: any, next: any) {
    res.cookie('access-token', null);
    res.sendStatus(200);
}

export async function refreshToken(req: any, res: any, next: any) {
    const refresh_token = req.cookies['refresh-token'];
    const access_token = await flow.refreshToken(refresh_token);
    res.cookie('access-token', access_token);
    res.sendStatus(200);
}
