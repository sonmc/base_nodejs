import { Role } from 'infrastructure/schemas/role.schema';

export class UserPresenter {
    username: string = '';
    full_name: string = '';
    email: string = '';
    roles: Role[];
    constructor(user: any) {
        this.username = user.username;
        this.email = user.email;
        this.roles = user.roles;
        this.full_name = user.full_name;
    }
}
