import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const token = <string>req.headers["token"];
	let jwtPayload;

	try {
		jwtPayload = <any>jwt.verify(token, config.jwtSecret);
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		res.status(401).send();
		return;
	}

	const { usuarioId, email, nome } = jwtPayload;
	const newToken = jwt.sign({ usuarioId, email, nome }, config.jwtSecret, {
		expiresIn: "1h",
	});

	res.setHeader("token", newToken);

	next();
};
