const BaseController = require("./BaseController.js");
class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async getAllInCategory(req, res) {
    let data = await this.model.findAll({
      where: {
        categoryId: req.params.id,
      },
    });
    res.json(data);
  }

  async getCategories(req, res) {
    let data = await this.model.findAll();
    res.json(data);
  }

  async createNewCategory(req, res) {
    let newCategory = await this.model.create({
      name: req.body.name,
    });

    res.send(newCategory);
  }
}

module.exports = CategoriesController;
