const express = require("express");
const {
  loginBuyer,
} = require("../../controllers/buyerControllers/loginBuyerController");
const {
  registerBuyer,
} = require("../../controllers/buyerControllers/registerBuyerController");
const router = express.Router();

router.post("/login", loginBuyer);
router.post("/register", registerBuyer);
module.exports = router;
