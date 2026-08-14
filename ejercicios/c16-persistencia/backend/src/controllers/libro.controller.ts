import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  try {
    const disponible = req.query.disponible === "true" ? true : req.query.disponible === "false" ? false : undefined;
    const libros = await libroService.findAll(disponible);
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const libro = await libroService.findById(Number(req.params.id));
    if (!libro) {
      res.status(404).json({ error: "Libro no encontrado" });
      return;
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevo = await libroService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const actualizado = await libroService.update(Number(req.params.id), req.body);
    if (!actualizado) {
      res.status(404).json({ error: "Libro no encontrado" });
      return;
    }
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const ok = await libroService.remove(Number(req.params.id));
    if (!ok) {
      res.status(404).json({ error: "Libro no encontrado" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
