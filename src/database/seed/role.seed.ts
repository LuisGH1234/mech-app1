import { EntityManager, Repository } from "typeorm";
import { Role } from "../../entity";
import { roles } from "../constant";

export async function seedRoles(manager: EntityManager) {
    console.log("+ Roles seed start");
    const roleRepository = manager.getRepository(Role);
    const rolesDB = await roleRepository.find();
    if (rolesDB.length === 0) {
        for (const role of roles) await seedRole(roleRepository, role);
    }
    console.log("- Roles seed finished");
}

function seedRole(repository: Repository<Role>, role: Partial<Role>) {
    return repository.save(repository.create(role));
}
