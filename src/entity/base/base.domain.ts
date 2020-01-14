import { TimeDomain } from "./time.domain";
import { PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ isAbstract: true })
export class BaseDomain extends TimeDomain {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
