import { Resolver, Query, Arg, ID, Args, FieldResolver, Root } from "type-graphql";
import { PaymentMethod } from "../../entity";
import { InjectService } from "../../lib";
import { PaymentMethodService } from "./payment.service";
import { FindByLanguageArgs, Language, ListArgs } from "../../@types";

@Resolver(PaymentMethod)
export class PaymentMethodResolver {
    constructor(
        @InjectService(PaymentMethodService) private readonly pmService: PaymentMethodService
    ) {}

    @Query(returns => PaymentMethod)
    paymentMethod(@Arg("id", type => ID) id: string) {
        return this.pmService.getPaymentMethod(id);
    }

    @Query(returns => [PaymentMethod])
    paymentMethods(@Args() args: FindByLanguageArgs) {
        return this.pmService.getPaymentMethods(args.filter, args.language);
    }

    @FieldResolver()
    mechs(@Root() pm: PaymentMethod, @Args() args: ListArgs) {
        return this.pmService.getMechsBy(pm.id!, args);
    }

    @FieldResolver()
    translations(@Root() pm: PaymentMethod) {
        return this.pmService.getPMTranlationsBy(pm.id!);
    }

    @FieldResolver()
    translation(@Root() pm: PaymentMethod, @Arg("language", type => Language) language: Language) {
        return this.pmService.getPMTranlationBy(pm.id!, language);
    }
}
