import { Repository, Brackets, EntityRepository, getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { Service } from "typedi";

@Service({ id: "user.repository", factory: () => getCustomRepository(UserRepository) })
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findUsers(limit: number, page: number, filter: string) {
        return await this.createQueryBuilder("user")
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
