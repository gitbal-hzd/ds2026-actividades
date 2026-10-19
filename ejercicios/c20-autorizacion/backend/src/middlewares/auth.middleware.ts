import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

type PayloadToken = {
  id: number;
  rol: "ADMIN" | "CLIENTE";
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Falta el token" });
    return;
  }

  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as PayloadToken;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
      return;
    }
    res.status(401).json({ error: "Token inválido" });
    return;
  }
}

export function authorize(...roles: Array<"ADMIN" | "CLIENTE">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      res.status(401).json({ error: "No autenticado" });
      return;
    }
    if (!roles.includes(req.usuario.rol)) {
      res.status(403).json({ error: "No tenés permiso para esta operación" });
      return;
    }
    next();
  };
}
