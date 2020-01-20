import { TimeDomain } from "./time.domain";
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ isAbstract: true })
export abstract class BaseDomain extends TimeDomain {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ default: true })
    active?: boolean;
}
