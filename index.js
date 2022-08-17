const cors = require("cors");
const express = require("express");
const CategoriesController = require("./Controllers/CategoriesController.js");
const SightingController = require("./Controllers/SightingController.js");
const CategoriesRouter = require("./Routers/CategoriesRouter.js");
const SightingsRouter = require("./Routers/SightingRouter.js");

const db = require("./db/models/index.js");
const { sighting, comment, category, create_sighting_categories } = db;

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

const categoriesController = new CategoriesController(category);
const sightingController = new SightingController(
  sighting,
  comment,
  create_sighting_categories,
  category
);

const sightingRouter = new SightingsRouter(sightingController, express);
const categoriesRouter = new CategoriesRouter(categoriesController, express);

app.use("/sightings", sightingRouter.routes());
app.use("/categories", categoriesRouter.routes());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// app.get("/sightings", async (req, res) => {
//   try {
//     const sightings = await sighting.findAll({
//       include: category,
//     });
//     console.log(sightings);
//     // const sightingsCategory = await sightings.map(async (sighting) => {
//     //   console.log("sighting:", sighting.dataValues.id);
//     //   let info = await create_sighting_categories.findAll({
//     //     where: {
//     //       sighting_id: sighting.dataValues.id,
//     //     },
//     //   });
//     //   console.log("info:", info);

//     //   let data = {
//     //     ...sighting.dataValues,
//     //     category: info,
//     //   };
//     //   return data;
//     // });
//     // console.log("sightingsCategory:", sightingsCategory);
//     // res.json(sightingsCategory);

//     res.json(sightings);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/sighting/:sightingId", async (req, res) => {
//   const singleSighting = await sighting.findByPk(req.params.sightingId);
//   res.json(singleSighting);
// });

// app.put("/sighting/:id", async (req, res) => {
//   await sighting.update(
//     {
//       location: req.body.location,
//       notes: req.body.note,
//       date: req.body.date,
//     },
//     {
//       where: { id: req.params.id },
//     }
//   );
//   res.send("Okay");
// });

// app.post("/sighting", async (req, res) => {
//   let sightingData = await sighting.create({
//     location: req.body.location,
//     notes: req.body.note,
//     date: req.body.date,
//   });
//   await create_sighting_categories.create({
//     categoryId: req.body.weather,
//     sightingId: sightingData.dataValues.id,
//   });

//   res.json({ message: "Success" });
// });

// app.get("/sightings/:id/comments", async (req, res) => {
//   let data = await comment.findAll({
//     where: {
//       sightingId: req.params.id,
//     },
//   });

//   console.log(data);

//   res.send(data);
// });

// app.post("/sightings/:id/comments", async (req, res) => {
//   let newComment = await comment.create({
//     content: req.body.content,
//     sightingId: req.params.id,
//   });

//   res.send(newComment);
// });

// app.put("/sightings/:id/comments", async (req, res) => {
//   let newComment = await comment.upsert({
//     id: req.body.id,
//     content: req.body.content,
//   });

//   res.send(newComment);
// });

// app.delete("/sightings/:id/comments", async (req, res) => {
//   let success = await comment.destroy({ where: { id: req.params.id } });
//   console.log(success);
//   res.json(success);
// });

// app.get("/categories", async (req, res) => {
//   let data = await category.findAll();
//   res.json(data);
// });

// app.post("/categories", async (req, res) => {
//   let newCategory = await category.create({
//     name: req.body.name,
//   });

//   res.send(newCategory);
// });
// app.get("/categories/:categoryId", async (req, res) => {
//   let data = await sighting.findAll({
//     where: {
//       categoryId: req.params.id,
//     },
//   });
//   res.json(data);
// });
