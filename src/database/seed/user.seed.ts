import { EntityManager, Repository } from "typeorm";
import { Role, User } from "../../entity";
import { users } from "../constant";

export async function seedUsers(manager: EntityManager) {
    console.log("+ Users seed start");
    const roleRepo = manager.getRepository(Role);
    const userRepo = manager.getRepository(User);
    const usersDB = await userRepo.find();
    if (usersDB.length === 0) {
        for (const user of users) await seedUser(userRepo, roleRepo, user);
    }
    console.log("- Users seed finished");
}

async function seedUser(
    userRepo: Repository<User>,
    roleRepo: Repository<Role>,
    user: Partial<User>
) {
    const role = await roleRepo.findOne({ where: { code: user.role?.code } });
    user.role = role;

    await userRepo.save(userRepo.create(user));
}
