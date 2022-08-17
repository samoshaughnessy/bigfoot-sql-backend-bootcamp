class CategoriesRouter {
  constructor(controller, express) {
    this.controller = controller;
    this.express = express;
  }

  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getCategories.bind(this.controller));
    router.post("/", this.controller.createNewCategory.bind(this.controller));
    router.get(
      "/:categoryId",
      this.controller.getAllInCategory.bind(this.controller)
    );

    return router;
  }
}

module.exports = CategoriesRouter;
