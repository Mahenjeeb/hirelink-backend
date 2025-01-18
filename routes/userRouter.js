import express from "express";
import {
  createUser,
  loginUser,
  deleteUser,
  updateUserDetails,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUserDetails);
router.get("/loginUser", loginUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
