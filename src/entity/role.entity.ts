import { BaseDomain } from "./base/base.domain";
import { Entity, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Role extends BaseDomain {
    @Field()
    @Column({ length: 4 })
    code: string;

    @Field()
    @Column({ length: 100 })
    description: string;

    @Field(type => [User], { nullable: true })
    @OneToMany(
        type => User,
        user => user.role
    )
    users?: User[];
}
