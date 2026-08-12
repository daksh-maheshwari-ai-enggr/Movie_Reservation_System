import express from "express";
import { auth, admin } from "../middleware/auth.js";

export const createCrud = (Model) => {
  const r = express.Router();
  r.get("/", async (req, res) =>
    res.json(await Model.find().sort({ createdAt: -1 })),
  );
  r.post("/", auth, admin, async (req, res) =>
    res.status(201).json(await Model.create(req.body)),
  );
  r.put("/:id", auth, admin, async (req, res) =>
    res.json(
      await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }),
    ),
  );
  r.delete("/:id", auth, admin, async (req, res) => {
    await Model.findByIdAndDelete(req.params.id);
    res.status(204).end();
  });
  return r;
};
