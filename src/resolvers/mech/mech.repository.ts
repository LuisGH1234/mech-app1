import { Repository, EntityRepository, Brackets } from "typeorm";
import { Mech } from "../../entity";

@EntityRepository(Mech)
export class MechRepository extends Repository<Mech> {
    findMechs(limit: number, page: number, filter: string) {
        return this.createQueryBuilder("mech")
            .leftJoin("mech.user", "user")
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
}
