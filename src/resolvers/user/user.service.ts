import { UserRepository } from "./user.repository";
import { Service, Inject } from "typedi";
import { JWT } from "../../lib";
import { UserInput, AuthResult, ListArgs } from "../../@types";

@Service("user.service")
export class UserSevice {
    constructor(@Inject("user.repository") private readonly userRepository: UserRepository) {}

    getUser() {
        return {
            firstname: "luis",
            lastname: "galindo",
            age: 21,
            email: "lagh3.30@gmail.com",
            id: "asasdas"
        };
    }

    async getUsers(args: ListArgs) {
        const { page = 1, limit = 10, filter = "" } = args;
        const users = await this.userRepository.findUsers(limit, page, filter);
        return { users: users[0], count: users[1] };
    }

    async register(data: UserInput) {
        console.log("ya1");
        const user = this.userRepository.create(data);
        console.log("ya2");
        await this.userRepository.save(user);
        console.log("ya3");
        console.log(user);
        return { token: JWT.sign(user.token) } as AuthResult;
    }
}
