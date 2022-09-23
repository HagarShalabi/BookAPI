const bookRoutes=require("express").Router();
const bookController=require("../controllers/books");
bookRoutes.post("/", bookController.add);
bookRoutes.get("/", bookController.select);
bookRoutes.put("/:id", bookController.update);
bookRoutes.delete("/:id", bookController.delete);

module.exports=bookRoutes;