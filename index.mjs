// index.mjs
import express from "express";
import { animalsRouter } from "./routes/animals.mjs";
import { habitatsRouter } from "./routes/habitats.mjs";
import { feedingTimesRouter } from "./routes/feedingTimes.mjs";

const app = express();

app.use(express.json());

app.use("/api/animals", animalsRouter);
app.use("/api/habitats", habitatsRouter);
app.use("/api/feeding-times", feedingTimesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
