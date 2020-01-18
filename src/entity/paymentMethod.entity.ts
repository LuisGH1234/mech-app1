import { BaseDomain } from "./base/base.domain";
import { Entity, Column, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Mech } from "./mech.entity";
import { PaymentMethodMech } from "./paymentMethodMech.entity";
import { PaymentMethodTranslation } from "./paymentMethodTranslation.entity";

@ObjectType()
@Entity()
export class PaymentMethod extends BaseDomain {
    @Field()
    @Column()
    code: string;

    @OneToMany(
        type => PaymentMethodMech,
        pmm => pmm.paymentMethod
    )
    paymentMethodMechs?: PaymentMethodMech[];

    @Field(type => [Mech], { nullable: true })
    mechs?: Mech[];

    @Field(type => [PaymentMethodTranslation])
    @OneToMany(
        type => PaymentMethodTranslation,
        trans => trans.paymentMethod,
        { cascade: ["insert", "remove"] }
    )
    translations: PaymentMethodTranslation[];
}
