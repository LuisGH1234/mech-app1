import { PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { PaymentMethod } from "./paymentMethod.entity";
import { Mech } from "./mech.entity";

@Entity()
export class PaymentMethodMech {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => PaymentMethod,
        pm => pm.paymentMethodMechs
    )
    paymentMethod: PaymentMethod;

    @ManyToOne(
        type => Mech,
        mech => mech.paymentMethodMechs
    )
    mech: Mech;
}
