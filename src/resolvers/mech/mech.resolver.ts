import { Resolver, Query, Args, ID, Arg } from "type-graphql";
import { Mech } from "../../entity";
import { InjectService } from "../../lib";
import { MechService } from "./mech.service";
import { ListArgs, MechPaginationResult } from "../../@types";

@Resolver(Mech)
export class MechResolver {
    constructor(@InjectService(MechService) private readonly mechService: MechService) {}

    @Query(returns => Mech, { nullable: true })
    mech(@Arg("id", type => ID) id: string) {
        return this.mechService.getMech(id);
    }

    @Query(returns => MechPaginationResult)
    mechs(@Args() args: ListArgs) {
        return this.mechService.getMechs(args);
    }
}
