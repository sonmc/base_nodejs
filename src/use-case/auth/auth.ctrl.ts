import flow from './auth.flow';

export async function login(req: any, res: any, next: any) {
    const { username, password } = req.body;
    const { status, result } = await flow.login(username, password);
    if (status == 'error') {
        res.sendStatus(401);
    } else {
        res.cookie('access-token', result.accessToken);
        res.cookie('refresh-token', result.refreshToken);
        res.sendStatus(200);
    }
}

export async function logout(req: any, res: any, next: any) {
    res.cookie('access-token', null);
    res.sendStatus(200);
}

export async function refreshToken(req: any, res: any, next: any) {
    const refresh_token = req.cookies['refresh-token'];
    const { status, result } = await flow.refreshToken(refresh_token);
    res.cookie('access-token', result.accessToken);
    res.sendStatus(200);
}
