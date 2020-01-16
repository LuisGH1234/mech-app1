import { Resolver, Query, Arg, Mutation, Args, ID } from "type-graphql";
import { User } from "../../entity";
import { UserService } from "./user.service";
import { Inject } from "typedi";
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
    register(@Arg("user") user: UserInput) {
        return this.userService.register(user);
    }
}
