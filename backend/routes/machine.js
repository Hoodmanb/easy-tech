const express = require("express");
const machineRouter = express.Router();
const upload = require("../utils/multer");
const machine = require("../controllers/machine");
const verifyToken = require("../middleware/verifyToken")

machineRouter.post("/", verifyToken, upload.array("media", 10), machine.createMachine);

machineRouter.get("/", machine.getMachines);

machineRouter.get("/:id", machine.getMachineById);

machineRouter.put("/:id", verifyToken, machine.updateMachine);

machineRouter.delete("/:id", verifyToken, machine.deleteMachine);

module.exports = machineRouter;
