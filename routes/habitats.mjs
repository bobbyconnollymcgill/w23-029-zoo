// routes/habitats.mjs
import express from "express";
import db from "../db.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  // Get all habitats
});

router.get("/:habitatId", (req, res) => {
  // Get a specific habitat by ID

  const habitatId = req.params.habitatId;

  const habitat = db.data.habitats.find((h) => h.id === habitatId);

  if (!habitat) {
    res.status(404).json({ message: "Habitat not found" });
    return;
  }

  res.json(habitat);
});

router.post("/", (req, res) => {
  // Add a new habitat
});

router.put("/:habitatId", (req, res) => {
  // Update an existing habitat by ID
});

router.delete("/:habitatId", (req, res) => {
  // Delete a habitat by ID
});

export const habitatsRouter = router;
