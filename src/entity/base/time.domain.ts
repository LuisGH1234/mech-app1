import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ isAbstract: true })
export class TimeDomain {
    @Field({ nullable: true })
    @CreateDateColumn()
    createdAt?: string;

    @Field({ nullable: true })
    @UpdateDateColumn()
    updatedAt?: string;
}
