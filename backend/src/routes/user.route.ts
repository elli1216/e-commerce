import express from "express";
import { getUsers, getUserById, deleteUser } from "../controllers/user.controller";

const router: express.Router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

export default router;