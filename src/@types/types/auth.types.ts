import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthResult {
    @Field()
    token: string;
}
