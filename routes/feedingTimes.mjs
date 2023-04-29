// routes/feedingTimes.mjs
import express from "express";
import { nanoid } from "nanoid";
import db from "../db.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  // Get all feeding times

  console.log("HELLO");

  res.json(db.data.feedingTimes);
});

router.get("/:feedingTimeId", (req, res) => {
  // Get a specific feeding time by ID
});

router.post("/", async (req, res) => {
  // Create a new feeding time

  const { animalId, time } = req.body;

  if (!animalId || !time) {
    res.status(400).json({
      message: "Both animalId and time are required",
    });
    return;
  }

  const animal = db.data.animals.find((a) => a.id === animalId);

  if (!animal) {
    res.status(404).json({ message: "Animal not found" });
    return;
  }

  const newFeedingTime = {
    id: nanoid(),
    animalId,
    time,
  };

  db.data.feedingTimes.push(newFeedingTime);
  await db.write();

  res.status(201).json(newFeedingTime);
});

router.put("/:feedingTimeId", async (req, res) => {
  // Update an existing feeding time by ID

  const feedingTimeId = req.params.feedingTimeId;
  const newFeedingTime = { id: feedingTimeId, ...req.body };

  console.log({
    feedingTimeId,
    newFeedingTime,
  });

  // Add a bouncer
  const foundFeedingTime = db.data.feedingTimes.find(
    (ft) => ft.id.toString() === feedingTimeId
  );

  if (foundFeedingTime === undefined) {
    res
      .status(404)
      .json({ error: `could not find feeding time with id ${feedingTimeId}` });

    return; // do not forget to put return or else it will continue on and carry out all those other side-effects that we DONT want to have happen
  }

  // Validate that the animal
  const foundAnimal = db.data.animals.find(
    (a) => a.id === newFeedingTime.animalId
  );

  if (foundAnimal === undefined) {
    res.status(404).json({
      error: `could not find animal with id ${newFeedingTime.animalId}`,
    });

    return;
  }

  db.data.feedingTimes = db.data.feedingTimes.filter(
    (ft) => ft.id.toString() !== feedingTimeId
  );

  db.data.feedingTimes.push(newFeedingTime);

  await db.write();

  res.json(newFeedingTime);
});

router.delete("/:feedingTimeId", (req, res) => {
  // Delete a feeding time by ID
});

export const feedingTimesRouter = router;
