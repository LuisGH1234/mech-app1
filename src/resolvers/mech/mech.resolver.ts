import { Resolver, Query, Args, ID, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { Mech } from "../../entity";
import { InjectService } from "../../lib";
import { MechService } from "./mech.service";
import {
    ListArgs,
    MechPaginationResult,
    AddMechInput,
    Language,
    AddMechPayload,
    UpdateMechPayload,
    UpdateMechInput
} from "../../@types";

@Resolver(Mech)
export class MechResolver {
    constructor(@InjectService(MechService) private readonly mechService: MechService) {}

    @Query(returns => Mech, { nullable: true })
    mech(@Arg("id", type => ID) id: string) {
        return this.mechService.getMech(id);
    }

    @Query(returns => MechPaginationResult)
    mechs(@Args() args: ListArgs): Promise<MechPaginationResult> {
        return this.mechService.getMechs(args);
    }

    @Mutation(returns => AddMechPayload)
    addMech(@Arg("mech") mech: AddMechInput): Promise<AddMechPayload> {
        return this.mechService.createMech(mech);
    }

    @Mutation(returns => UpdateMechPayload)
    updateMech(@Arg("mech") mech: UpdateMechInput): Promise<UpdateMechPayload> {
        return this.mechService.updateMech(mech);
    }

    @FieldResolver()
    paymentMethods(
        @Root() mech: Mech,
        @Arg("language", type => Language, { nullable: true }) language: Language
    ) {
        return this.mechService.getPaymentMethodsBy(mech.id!, language);
    }

    @FieldResolver()
    user(@Root() mech: Mech) {
        return this.mechService.getUserBy(mech.id!);
    }
}
