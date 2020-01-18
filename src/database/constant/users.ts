import { User } from "../../entity";
import { roles } from "./roles";

export const users: Partial<User>[] = [
    {
        firstname: "Luis",
        lastname: "Galindo",
        email: "lagh3.30@gmail.com",
        password: "a",
        role: roles.find(x => x.code === "QWE1")!
    }
];
