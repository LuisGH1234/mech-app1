import { Repository, EntityRepository } from "typeorm";
import { PaymentMethod, PaymentMethodTranslation, Mech } from "../../entity";
import { Language } from "../../@types";

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends Repository<PaymentMethod> {
    findPaymentMethods(filter: string, language: Language) {
        return this.createQueryBuilder("pm")
            .leftJoin("pm.translations", "translation")
            .where("translation.language = :language", { language })
            .andWhere(`translation.description LIKE "%${filter}%"`)
            .getMany();
    }

    /** Find payment method translations by payment method */
    findPMTranlationsBy(paymentMethodID: string) {
        const pmtRepo = this.manager.getRepository(PaymentMethodTranslation);
        return pmtRepo
            .createQueryBuilder("pmt")
            .leftJoin("pmt.paymentMethod", "paymentMethod")
            .where("paymentMethod.id = :paymentMethodID", { paymentMethodID })
            .getMany();
    }

    /** Find payment method translation by payment method */
    findPMTranlationBy(paymentMethodID: string, language: Language) {
        const pmtRepo = this.manager.getRepository(PaymentMethodTranslation);
        return pmtRepo
            .createQueryBuilder("pmt")
            .leftJoin("pmt.paymentMethod", "paymentMethod")
            .where("paymentMethod.id = :paymentMethodID", { paymentMethodID })
            .andWhere("pmt.language = :language", { language })
            .getOne();
    }

    findMechsByPaymentMethod(paymentMethodID: string, limit: number, page: number, filter: string) {
        const mechRepo = this.manager.getRepository(Mech);
        return mechRepo
            .createQueryBuilder("mech")
            .leftJoin("mech.paymentMethodMechs", "paymentMethodMech")
            .leftJoin("paymentMethodMech.paymentMethod", "paymentMethod")
            .where("paymentMethod.id = :paymentMethodID", { paymentMethodID })
            .skip(limit * (page - 1))
            .take(limit)
            .getManyAndCount();
    }
}
