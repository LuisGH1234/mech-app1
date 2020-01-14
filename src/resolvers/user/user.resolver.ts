import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../entity";

@Resolver(User)
export class UserResolver {
    @Query(returns => User)
    user(@Arg("id") id: string): Partial<User> {
        return { firstname: "luis", lastname: "galindo", age: 21, email: "lagh3.30@gmail.com" };
    }
}
