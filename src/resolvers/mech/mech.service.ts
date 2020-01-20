import { Service } from "typedi";
import { InjectRepository } from "../../lib";
import { MechRepository } from "./mech.repository";
import {
    ListArgs,
    MechPaginationResult,
    AddMechInput,
    Language,
    UpdateMechInput,
    AddMechPayload,
    UpdateMechPayload
} from "../../@types";
import { User, PaymentMethodMech, PaymentMethod } from "../../entity";

@Service()
export class MechService {
    constructor(
        @InjectRepository(MechRepository) private readonly mechRepository: MechRepository
    ) {}

    getMech(id: string) {
        return this.mechRepository.findOne(id);
    }

    async getMechs(args: ListArgs) {
        const { page = 1, limit = 10, filter = "" } = args;
        const mechs = await this.mechRepository.findMechs(limit, page, filter);
        return { list: mechs[0], count: mechs[1] } as MechPaginationResult;
    }

    async createMech(mechInput: AddMechInput) {
        const mech = this.mechRepository.create(mechInput);
        mech.user = { id: mechInput.userID } as User;
        mech.paymentMethodMechs = mechInput.paymentMethodsID.map(
            x =>
                ({
                    paymentMethod: { id: x } as PaymentMethod
                } as PaymentMethodMech)
        );
        const result = await this.mechRepository.save(mech);
        return { mech: result } as AddMechPayload;
    }

    getPaymentMethodsBy(mechID: string, language = Language.SPANISH) {
        return this.mechRepository.findPaymentMethodsByMech(mechID, language);
    }

    getUserBy(mechID: string) {
        return this.mechRepository.findUserByMech(mechID);
    }

    async updateMech(mechInput: UpdateMechInput) {
        const currentMech = await this.mechRepository.findOne(mechInput.id);
        if (!currentMech) throw new Error("Mech not found");

        const mech = this.mechRepository.create(mechInput);
        if (mechInput.userID) {
            const user = await this.mechRepository.findUser(mechInput.userID);
            if (!user) throw new Error("User not found");
            mech.user = { id: mechInput.userID } as User;
        }
        const result = await this.mechRepository.updateAndFind(mech);
        return { mech: result } as UpdateMechPayload;
    }
}
