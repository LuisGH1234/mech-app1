import { Repository, EntityRepository } from "typeorm";
import { Role, User } from "../../entity";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    findRoles(filter: string) {
        return this.createQueryBuilder("role")
            .where(`role.description like "%${filter}%"`)
            .getMany();
    }

    findUsersByRole(roleID: string) {
        const userRepo = this.manager.getRepository(User);
        return userRepo
            .createQueryBuilder("user")
            .leftJoin("user.role", "role")
            .where("role.id = :roleID", { roleID })
            .getMany();
    }
}
