const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const verifyJwt = require("../middlewares/verifyJwt");
const updateDurationController = require("../controllers/updateDurationController");
// const passCodeController = require("../controllers/passCodeController");
// const updateLevelController = require("../controllers/updateLevelController");
// const adminController = require("../controllers/adminController");
// const endGameController = require("../controllers/endGameController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/updateDuration", verifyJwt, updateDurationController);
// router.post("/admin", adminController);
// router.post("/passCode", passCodeController);
// router.post("/updateLevel", updateLevelController);
// router.post("/endGame", endGameController);

module.exports = router;
