class SightingsRouter {
  constructor(controller, express) {
    this.controller = controller;
    this.express = express;
  }

  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.put("/id", this.controller.editOne.bind(this.controller));
    router.post("/", this.controller.insertOne.bind(this.controller));

    router.get(
      "/:id/comments",
      this.controller.getSightingComment.bind(this.controller)
    );
    router.post(
      "/:id/comments",
      this.controller.postSightingComment.bind(this.controller)
    );
    router.put(
      "/:id/comments",
      this.controller.editComment.bind(this.controller)
    );
    router.delete(
      "/:id/comments",
      this.controller.deleteComment.bind(this.controller)
    );

    return router;
  }
}

module.exports = SightingsRouter;
