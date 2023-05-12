import { Entity, Column, Index, ManyToMany, JoinTable } from 'typeorm';
import { BaseSchema } from './base.schema';
import { Role } from './role.schema';
@Entity({ name: 'users' })
export class User extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = '';

    @Column({ nullable: true })
    full_name: string = '';

    @Column({ nullable: true })
    email: string = '';

    @Column()
    password: string = '';

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: Role[] | undefined;
}
