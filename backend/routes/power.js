const express = require("express");
const powerRouter = express.Router();
const power = require("../controllers/power");
const verifyToken = require("../middleware/verifyToken")

powerRouter.post("/", verifyToken, power.createPower);

powerRouter.get("/", power.getPowers);

powerRouter.get("/:id", power.getPowerById);

powerRouter.put("/:id", verifyToken, power.updatePower);

powerRouter.delete("/:id", verifyToken, power.deletePower);

module.exports = powerRouter;
