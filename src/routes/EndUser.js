const express = require("express");
const { endUserRegister, getAllEndUser, getSpecificEndUser, updateEndUserDetails, deleteEndUser } = require("../controllers/EndUser");

const router = express.Router();

router.post("/registerEnduser", endUserRegister);
router.get("/getAllEndusers", getAllEndUser);
router.get("/getEnduser/:endUserId", getSpecificEndUser);
router.patch("/updateEnduser/:endUserId", updateEndUserDetails);
router.delete("/deleteEnduser/:endUserId", deleteEndUser);

module.exports = router;