import { Repository, Brackets, EntityRepository } from "typeorm";
import { User, Role, Mech } from "../../entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findUsers(limit: number, page: number, filter: string) {
        return this.createQueryBuilder("user")
            .where(
                new Brackets(sqb => {
                    sqb.where(`user.firstName like "%${filter}%"`).orWhere(
                        `user.lastName like "%${filter}%"`
                    );
                })
            )
            .skip(limit * (page - 1))
            .take(limit)
            .getManyAndCount();
    }

    findRoleByUser(userID: string) {
        const rolRepo = this.manager.getRepository(Role);
        return rolRepo
            .createQueryBuilder("role")
            .leftJoin("role.users", "user")
            .where("user.id = :userID", { userID })
            .getOne();
    }

    findMechsByUser(userID: string) {
        const mechRepo = this.manager.getRepository(Mech);
        return mechRepo
            .createQueryBuilder("mech")
            .leftJoin("mech.user", "user")
            .where("user.id = :userID", { userID })
            .getMany();
    }
}
