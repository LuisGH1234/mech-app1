import { UserRepository } from "./user.repository";
import { Service } from "typedi";
import { JWT, InjectRepository } from "../../lib";
import { UserInput, AuthResult, ListArgs, UserPaginationResult } from "../../@types";

@Service()
export class UserService {
    // constructor(@Inject("user.repository") private readonly userRepository: UserRepository) {}
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository
    ) {}

    getUser(id: string) {
        return this.userRepository.findOne(id);
    }

    getRoleByUser(userID: string) {
        return this.userRepository.findRoleByUser(userID);
    }

    getMechsByUser(userID: string) {
        return this.userRepository.findMechsByUser(userID);
    }

    async getUsers(args: ListArgs) {
        const { page = 1, limit = 10, filter = "" } = args;
        const users = await this.userRepository.findUsers(limit, page, filter);
        return { list: users[0], count: users[1] } as UserPaginationResult;
    }

    async register(data: UserInput) {
        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
        console.log(user);
        return { token: JWT.sign(user.token) } as AuthResult;
    }
}
