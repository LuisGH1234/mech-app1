import { EntityManager, Repository } from "typeorm";
import { paymentMethods } from "../constant";
import { PaymentMethod } from "../../entity";

export async function seedPaymentMethods(manager: EntityManager) {
    console.log("+ Payment Methods seed start");
    const pmRepository = manager.getRepository(PaymentMethod);
    const pmsDB = await pmRepository.find();
    if (pmsDB.length === 0) {
        for (const paymentMethod of paymentMethods)
            await seedPaymentMethod(pmRepository, paymentMethod);
    }
    console.log("- Payment Methods seed finished");
}

function seedPaymentMethod(repository: Repository<PaymentMethod>, role: Partial<PaymentMethod>) {
    return repository.save(repository.create(role));
}
