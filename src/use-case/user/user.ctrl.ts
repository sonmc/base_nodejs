import { User } from 'infrastructure/schemas/user.schema';
import { UserPresenter } from './presenter/user.presenter';
import flow from './user.flow';

export async function getCurrentUser(req: any, res: any, next: any) {
    const access_token = req.cookies['access-token'];
    const { status, result } = await flow.getCurrentUser(access_token);
    const userPresenter = new UserPresenter(result);
    res.json(userPresenter);
}

export async function getAllUser(req: any, res: any, next: any) {
    const { status, result } = await flow.getAllUser();
    const users = result.map((u: User) => {
        return new UserPresenter(u);
    });
    res.json(users);
}
