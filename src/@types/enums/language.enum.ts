import { registerEnumType } from "type-graphql";

export enum Language {
    SPANISH = "spanish",
    ENGLISH = "english"
}

registerEnumType(Language, {
    name: "Language",
    description: "Basic languages"
});
