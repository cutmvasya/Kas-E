const express = require('express');
const router = express.Router();
const safesController = require("../controllers/safesController");
const auth = require('../middlewares/authentication')

router.post("/create", auth, safesController.createSafe);
router.get("/", auth, safesController.getSafe);
router.post("/income", auth, safesController.addIncomeAmount);
router.delete("/:id", auth, safesController.deleteSafe);

module.exports = router;