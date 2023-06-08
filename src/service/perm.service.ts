import { getRepository } from 'typeorm';
import { Permission } from '../../database/schemas/perm.schema';

class PermService {
    async updateFromRouter(routers: any) {
        const permRepo = getRepository(Permission);
        const lastId = await this.getLastId();
        let index = 0;
        routers.forEach(async (r: any) => {
            const perm = await this.isPermExist(r.path);
            index += 1;
            if (perm != null) {
                const p = new Permission();
                p.id = lastId + index;
                p.label = r.path;
                permRepo.save(p);
            }
        });
        return { status: 'success', result: null };
    }

    async isPermExist(name: string) {
        const permRepo = getRepository(Permission);
        const perm = (await permRepo.findOne({
            where: {
                name: name,
            },
        })) as Permission;
        return perm;
    }

    async getLastId() {
        const permRepo = getRepository(Permission);
        const perm = (await permRepo.findOne({
            order: {
                id: 'DESC',
            },
        })) as Permission;

        return perm ? perm.id : 0;
    }

    async update(perm: Permission) {
        const permRepo = getRepository(Permission);
        permRepo.save(perm);
        return { status: 'success', result: perm };
    }
}

export default new PermService();
