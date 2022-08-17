const BaseController = require("./BaseController.js");
class SightingsController extends BaseController {
  constructor(model, commentModel, sightingCategoiresModel, categoryModel) {
    super(model);
    this.model = model;
    this.commentModel = commentModel;
    this.sightingCategoiresModel = sightingCategoiresModel;
    this.categoryModel = categoryModel;
  }

  async getAll(req, res) {
    console.log("getting all ");
    try {
      const sightings = await this.model.findAll({
        include: this.categoryModel,
      });
      console.log(sightings);
      res.json(sightings);
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(req, res) {
    const singleSighting = await this.model.findByPk(req.params.sightingId);
    res.json(singleSighting);
  }

  async editOne(req, res) {
    await this.model.update(
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
  }

  async insertOne(req, res) {
    let sightingData = await this.model.create({
      location: req.body.location,
      notes: req.body.note,
      date: req.body.date,
    });
    await this.sightingCategoiresModel.create({
      categoryId: req.body.weather,
      sightingId: sightingData.dataValues.id,
    });

    res.json({ message: "Success" });
  }

  async getSightingComment(req, res) {
    let data = await this.commentModel.findAll({
      where: {
        sightingId: req.params.id,
      },
    });

    console.log(data);

    res.send(data);
  }

  async postSightingComment(req, res) {
    let newComment = await this.commentModel.create({
      content: req.body.content,
      sightingId: req.params.id,
    });

    res.send(newComment);
  }

  async editComment(req, res) {
    let newComment = await this.commentModel.upsert({
      id: req.body.id,
      content: req.body.content,
    });

    res.send(newComment);
  }

  async deleteComment(req, res) {
    let success = await this.commentModel.destroy({
      where: { id: req.params.id },
    });
    console.log(success);
    res.json(success);
  }
}
module.exports = SightingsController;
