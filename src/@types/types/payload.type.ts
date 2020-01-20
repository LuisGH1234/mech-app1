import { ObjectType, Field } from "type-graphql";
import { Mech } from "../../entity/mech.entity";

@ObjectType()
export class AddMechPayload {
    @Field(type => Mech)
    mech: Mech;
}

@ObjectType()
export class UpdateMechPayload {
    @Field(type => Mech)
    mech: Mech;
}
