const express = require("express");
const { createUser, getAllUser, deleteUser, getSpecificUser, updateUserDetails } = require("../controllers/User");

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUser);
router.get("/getUser/:userId", getSpecificUser);
router.patch("/updateUser/:userId", updateUserDetails);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;