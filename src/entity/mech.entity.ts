import { BaseDomain } from "./base/base.domain";
import { Entity, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";
import { PaymentMethod } from "./paymentMethod.entity";
import { PaymentMethodMech } from "./paymentMethodMech.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Mech extends BaseDomain {
    //#region VOLTAGE
    /** Unit of measurement - V */
    @Field({ nullable: true })
    @Column({ type: "float" })
    voltageStart: number;

    /** Unit of measurement - V */
    @Field({ nullable: true })
    @Column({ type: "float" })
    voltageEnd: number;
    //#endregion

    /** Unit of measurement - W */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    power: number;

    /** Unit of measurement - kg */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    weightCapacity: number;

    //#region  DELIVERY TIME
    /** Unit of measurement - seconds */
    @Field(type => Int, { nullable: true })
    @Column({ type: "int" })
    deliveryTimeStart: number;

    /** Unit of measurement - seconds */
    @Field(type => Int, { nullable: true })
    @Column({ type: "int" })
    deliveryTimeEnd: number;
    //#endregion

    //#region ORANGE SIZE
    /** Unit of measurement - mm */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    orangeSizeStart: number;

    /** Unit of measurement - mm */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    orangeSizeEnd: number;
    //#endregion

    //#region DIMENSION
    /** Unit of measurement - mm */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    long: number;

    /** Unit of measurement - mm */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    width: number;

    /** Unit of measurement - mm */
    @Field(type => Float, { nullable: true })
    @Column({ type: "float" })
    height: number;
    //#endregion

    //#region TEMPERATURE
    /** Default unit of measurement - °C */
    @Field(type => Int, { nullable: true })
    @Column({ type: "int" })
    temperatureStart: number;

    /** Default unit of measurement - °C */
    @Field(type => Int, { nullable: true })
    @Column({ type: "int" })
    temperatureEnd: number;
    //#endregion

    @OneToMany(
        type => PaymentMethodMech,
        pmm => pmm.mech,
        { cascade: ["insert"] }
    )
    paymentMethodMechs: PaymentMethodMech[];

    @Field(type => User, { nullable: true })
    @ManyToOne(
        type => User,
        user => user.mechs,
        { nullable: true }
    )
    user: User;

    @Field(type => [PaymentMethod], { nullable: true })
    paymentMethods: PaymentMethod[];
}
