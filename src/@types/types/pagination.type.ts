import { ObjectType, Field, Int } from "type-graphql";
import { User } from "../../entity/user.entity";
import { Mech } from "../../entity/mech.entity";

@ObjectType()
export class UserPaginationResult {
    @Field(type => [User])
    list: User[];

    @Field(type => Int)
    count: number;
}

@ObjectType()
export class MechPaginationResult {
    @Field(type => [Mech])
    list: Mech[];

    @Field(type => Int)
    count: number;
}
