import {
    Repository,
    EntityRepository,
    Brackets,
    Transaction,
    TransactionManager,
    TransactionRepository
} from "typeorm";
import { Mech, User, PaymentMethod } from "../../entity";
import { Language } from "../../@types";

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

    findUserByMech(mechID: string) {
        const userRepo = this.manager.getRepository(User);
        return userRepo
            .createQueryBuilder("user")
            .leftJoin("user.mechs", "mech")
            .where("mech.id = :mechID", { mechID })
            .getOne();
    }

    findPaymentMethodsByMech(mechID: string, language: Language) {
        const pmRepo = this.manager.getRepository(PaymentMethod);
        return pmRepo
            .createQueryBuilder("pm")
            .leftJoin("pm.paymentMethodMechs", "paymentMethodMech")
            .leftJoin("paymentMethodMech.mech", "mech")
            .where("mech.id = :mechID", { mechID })
            .getMany();
    }

    findUser(userID: string) {
        const userRepo = this.manager.getRepository(User);
        return userRepo.findOne(userID);
    }

    @Transaction()
    async updateAndFind(mech: Partial<Mech>, @TransactionRepository(Mech) repo?: Repository<Mech>) {
        await repo!.update(mech.id!, mech);
        return await repo!.findOne(mech.id);
    }
}
