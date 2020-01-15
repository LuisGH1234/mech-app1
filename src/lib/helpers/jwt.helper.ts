import jwt from "jsonwebtoken";
import { Request, Response } from "express";
// import { Unauthorized } from "../../http-status";
// import { User } from "../../../database/entity/User";

const secretkey = "secret-key-token";
const options: jwt.SignOptions = {
    expiresIn: "1h"
};

const verify = (req: Request, res?: Response) => {
    console.log("verrii");
    try {
        const authorization = req.get("authorization");
        if (!authorization || authorization.length === 0) {
            // if (res) res.status(401);
            throw new Error("No autorizado");
        }
        const token = authorization.split(" ")[1];
        const payload: any = jwt.verify(token, secretkey);
        console.log(payload);
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp <= now) {
            // if (res) res.status(401);
            throw new Error("El token ha expirado");
        }

        return payload.user;
    } catch (error) {
        // if (res) res.status(401);
        throw new Error(error.message);
    }
};

const sign = (user: string | object | Buffer) => {
    return jwt.sign({ user }, secretkey, options);
};

export default {
    verify,
    sign
};
