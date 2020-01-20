import { ArgsType, Field, Int, ID } from "type-graphql";
import { Language } from "../enums";

@ArgsType()
export class ListArgs {
    @Field(type => Int, { nullable: true })
    page: number;

    @Field(type => Int, { nullable: true })
    limit: number;

    @Field({ nullable: true })
    filter: string;
}

@ArgsType()
export class FindOneByLanguageArgs {
    @Field(type => ID)
    id: string;

    @Field(type => Language, { nullable: true })
    language: Language;
}

@ArgsType()
export class FindByLanguageArgs {
    @Field({ nullable: true })
    filter: string;

    @Field(type => Language, { nullable: true })
    language: Language;
}
