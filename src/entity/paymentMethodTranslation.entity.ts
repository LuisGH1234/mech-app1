import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseDomain } from "./base/base.domain";
import { PaymentMethod } from "./paymentMethod.entity";

@ObjectType()
@Entity()
export class PaymentMethodTranslation extends BaseDomain {
    @Field()
    @Column()
    language: string;

    @Field()
    @Column({ default: false })
    isDefault: boolean;

    @Field()
    @Column()
    description: string;

    @Field(type => PaymentMethod)
    @ManyToOne(
        type => PaymentMethod,
        pm => pm.translations
    )
    paymentMethod?: PaymentMethod;
}
