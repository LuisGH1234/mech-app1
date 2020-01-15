import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UserInput {
    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(type => Int, { nullable: true })
    age: number;
}
