import { ConnectionOptions, createConnection } from "typeorm";

export const defaultConfig: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "mech-db",
    synchronize: true,
    logging: false,
    charset: "utf8mb4",
    entities: ["dist/entity/**/*.entity.js"],
    migrations: ["dist/migration/**/*.entity.js"],
    subscribers: ["dist/subscriber/**/*.entity.js"]
};

export const openConnection = (config = defaultConfig) => createConnection(config);
