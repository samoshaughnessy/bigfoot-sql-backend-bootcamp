import cors from "cors";
import express from "express";

import db from "./db/models/index.cjs";
const { sighting, comment } = db;
console.log("ok", sighting);

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await sighting.findAll();
  res.json(sightings);
});

app.get("/sighting/:sightingId", async (req, res) => {
  const singleSighting = await sighting.findByPk(req.params.sightingId);
  res.json(singleSighting);
});

app.put("/sighting/:id", async (req, res) => {
  await sighting.update(
    {
      location: req.body.location,
      notes: req.body.note,
      date: req.body.date,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.send("Okay");
});

app.post("/sighting", async (req, res) => {
  await sighting.create({
    location: req.body.location,
    notes: req.body.note,
    date: req.body.date,
  });

  res.json({ message: "Success" });
});

app.get("/sightings/:id/comments", async (req, res) => {
  // find by something
  let data = await comment.findAll({
    where: {
      SightingId: req.params.id,
    },
  });

  console.log(data);

  res.send(data);
});

app.post("/sightings/:id/comments", async (req, res) => {
  await comment.create({
    content: req.body.content,
    SightingId: req.params.id,
  });

  res.send("done");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
