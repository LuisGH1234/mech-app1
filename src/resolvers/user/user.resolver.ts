import { Resolver, Query, Arg, Mutation, Args } from "type-graphql";
import { User } from "../../entity";
import { UserSevice } from "./user.service";
import { Inject } from "typedi";
import { AuthResult, UserInput, ListArgs, UserPaginationResult } from "../../@types";

@Resolver(User)
export class UserResolver {
    constructor(@Inject("user.service") private readonly userService: UserSevice) {}

    @Query(returns => User)
    user(@Arg("id") id: string): Partial<User> {
        const user = this.userService.getUser();
        console.log("yess:", user);
        return user;
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
