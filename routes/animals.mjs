// routes/animals.mjs
import express from "express";
import db from "../db.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  // Get all animals

  console.log("Object.keys(db)", Object.keys(db));

  res.json(db.data.animals);
});

router.get("/:animalId", (req, res) => {
  // Get a specific animal by ID

  const animalId = req.params.animalId;

  console.log("animalId", animalId, db.data.animals);

  const animal = db.data.animals.find((a) => a.id.toString() === animalId);

  if (animal === undefined) {
    res.status(404).end();
  } else {
    // We found it
    res.json(animal);
  }
});

router.post("/", (req, res) => {
  // Add a new animal
});

router.put("/:animalId", (req, res) => {
  // Update an existing animal by ID
});

router.delete("/:animalId", (req, res) => {
  // Delete an animal by ID
});

export const animalsRouter = router;
