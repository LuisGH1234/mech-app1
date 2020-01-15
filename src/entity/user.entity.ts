import { BaseDomain } from "./base/base.domain";
import { Column, BeforeInsert, Entity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import * as bcrypt from "bcrypt";

@ObjectType()
@Entity()
export class User extends BaseDomain {
    @Field({ nullable: true })
    @Column({ length: 100 })
    firstname: string;

    @Field({ nullable: true })
    @Column({ length: 100 })
    lastname: string;

    @Field({ nullable: true })
    @Column()
    email: string;

    @Column({ select: false })
    password?: string;

    @Field(type => Int, { nullable: true })
    @Column({ nullable: true })
    age?: number;

    @BeforeInsert()
    beforeInsert() {
        if (this.password) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }

    get token(): Partial<User> {
        return {
            email: this.email,
            id: this.id
        };
    }
}
