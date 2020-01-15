import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ListArgs {
    @Field(type => Int, { nullable: true })
    page: number;

    @Field(type => Int, { nullable: true })
    limit: number;

    @Field({ nullable: true })
    filter: string;
}
