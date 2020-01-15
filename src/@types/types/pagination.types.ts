import { User } from "../../entity";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class UserPaginationResult {
    @Field(type => [User])
    users: User[];

    @Field(type => Int)
    count: number;
}
