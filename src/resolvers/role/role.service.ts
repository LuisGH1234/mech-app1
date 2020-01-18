import { Service } from "typedi";
import { InjectRepository } from "../../lib";
import { RoleRepository } from "./role.repository";

@Service()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository
    ) {}

    getRoles(filter = "") {
        return this.roleRepository.findRoles(filter);
    }

    getRole(id: string) {
        return this.roleRepository.findOne(id);
    }

    getUsersByRole(roleID: string) {
        return this.roleRepository.findUsersByRole(roleID);
    }
}
