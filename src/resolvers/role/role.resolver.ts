import { Resolver, Query, Arg, ID, FieldResolver, Root } from "type-graphql";
import { Role } from "../../entity";
import { InjectService } from "../../lib";
import { RoleService } from "./role.service";

@Resolver(Role)
export class RoleResolver {
    constructor(@InjectService(RoleService) private readonly roleService: RoleService) {}

    @Query(returns => [Role])
    roles(@Arg("filter", { nullable: true }) filter: string) {
        return this.roleService.getRoles(filter);
    }

    role(@Arg("id", type => ID) id: string) {
        return this.roleService.getRole(id);
    }

    @FieldResolver()
    users(@Root() role: Role) {
        return this.roleService.getUsersByRole(role.id!);
    }
}
