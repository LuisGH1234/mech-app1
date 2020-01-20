import { InputType, Field, Int, ID } from "type-graphql";

@InputType()
export class AddMechInput {
    @Field()
    voltageStart: number;

    @Field()
    voltageEnd: number;

    @Field()
    power: number;

    @Field()
    weightCapacity: number;

    @Field(type => Int)
    deliveryTimeStart: number;

    @Field(type => Int)
    deliveryTimeEnd: number;

    @Field()
    orangeSizeStart: number;

    @Field()
    orangeSizeEnd: number;

    @Field()
    long: number;

    @Field()
    width: number;

    @Field()
    height: number;

    @Field(type => Int)
    temperatureStart: number;

    @Field(type => Int)
    temperatureEnd: number;

    // Filed must be deleted and use token user
    @Field(type => ID, { nullable: true })
    userID: string;

    @Field(type => [ID])
    paymentMethodsID: string[];
}

@InputType()
export class UpdateMechInput {
    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    voltageStart?: number;

    @Field({ nullable: true })
    voltageEnd?: number;

    @Field({ nullable: true })
    power?: number;

    @Field({ nullable: true })
    weightCapacity?: number;

    @Field(type => Int, { nullable: true })
    deliveryTimeStart?: number;

    @Field(type => Int, { nullable: true })
    deliveryTimeEnd?: number;

    @Field({ nullable: true })
    orangeSizeStart?: number;

    @Field({ nullable: true })
    orangeSizeEnd?: number;

    @Field({ nullable: true })
    long?: number;

    @Field({ nullable: true })
    width?: number;

    @Field({ nullable: true })
    height?: number;

    @Field(type => Int, { nullable: true })
    temperatureStart?: number;

    @Field(type => Int, { nullable: true })
    temperatureEnd?: number;

    // Filed must be deleted and use token user
    @Field(type => ID, { nullable: true })
    userID?: string;

    // @Field(type => [ID], { nullable: true })
    // paymentMethodsID: string[];
}
