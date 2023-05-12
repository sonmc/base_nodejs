import { UserPresenter } from './presenter/user.presenter';
import flow from './user.flow';

export async function getCurrentUser(req: any, res: any, next: any) {
    const access_token = req.cookies['access-token'];
    const user = await flow.getCurrentUser(access_token);
    const userPresenter = new UserPresenter(user);
    res.json(userPresenter);
}
