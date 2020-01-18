import { User, Mech } from "../../entity";
import { ObjectType, Field, Int } from "type-graphql";

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
