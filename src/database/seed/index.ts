import { Connection } from "typeorm";
import { openConnection } from "..";
import { seedRoles } from "./role.seed";
import { seedUsers } from "./user.seed";
import { seedPaymentMethods } from "./paymentmethod.seed";

async function seed(connection: Connection) {
    connection
        .transaction(async manager => {
            console.log("-- SEEDING ...");
            await seedRoles(manager);
            await seedUsers(manager);
            await seedPaymentMethods(manager);
            console.log("-- FINISHED ...");
        })
        .then(val => {
            console.log("- Database seeding done.");
            process.exit(0);
        })
        .catch(err => {
            console.log("Database seeding failed.", err);
            process.exit(1);
        });
}

async function init() {
    const mysqlConn = await openConnection();
    await seed(mysqlConn);
}

init();
