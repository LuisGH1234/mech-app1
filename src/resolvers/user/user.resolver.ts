import { Resolver, Query, Arg, Mutation, Args, ID, FieldResolver, Root } from "type-graphql";
import { User } from "../../entity";
import { UserService } from "./user.service";
import { AuthResult, UserInput, ListArgs, UserPaginationResult } from "../../@types";
import { InjectService } from "../../lib";

@Resolver(User)
export class UserResolver {
    // constructor(@Inject(type => UserService) private readonly userService: UserService) {}

    constructor(@InjectService(UserService) private readonly userService: UserService) {}

    @Query(returns => User, { nullable: true })
    user(@Arg("id", type => ID) id: string) {
        return this.userService.getUser(id);
    }

    @Query(returns => UserPaginationResult)
    users(@Args() args: ListArgs) {
        return this.userService.getUsers(args);
    }

    @Mutation(returns => AuthResult)
    registerUser(@Arg("user") user: UserInput) {
        return this.userService.register(user);
    }

    @FieldResolver()
    role(@Root() user: User) {
        return this.userService.getRoleByUser(user.id!);
    }

    @FieldResolver()
    mechs(@Root() user: User) {
        return this.userService.getMechsByUser(user.id!);
    }
}
