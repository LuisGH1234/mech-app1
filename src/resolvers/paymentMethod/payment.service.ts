import { Service } from "typedi";
import { InjectRepository } from "../../lib";
import { PaymentMethodRepository } from "./payment.repository";
import { Language, ListArgs, MechPaginationResult } from "../../@types";

@Service()
export class PaymentMethodService {
    constructor(
        @InjectRepository(PaymentMethodRepository)
        private readonly pmRepository: PaymentMethodRepository
    ) {}

    getPaymentMethod(id: string) {
        return this.pmRepository.findOne(id);
    }

    getPaymentMethods(filter = "", language = Language.SPANISH) {
        return this.pmRepository.findPaymentMethods(filter, language);
    }

    getPMTranlationsBy(paymentMethodID: string) {
        return this.pmRepository.findPMTranlationsBy(paymentMethodID);
    }

    getPMTranlationBy(paymentMethodID: string, language = Language.SPANISH) {
        return this.pmRepository.findPMTranlationBy(paymentMethodID, language);
    }

    async getMechsBy(paymentMethodID: string, args: ListArgs) {
        const { page = 1, limit = 10, filter = "" } = args;
        const mechs = await this.pmRepository.findMechsByPaymentMethod(
            paymentMethodID,
            limit,
            page,
            filter
        );
        return { list: mechs[0], count: mechs[1] } as MechPaginationResult;
    }
}
