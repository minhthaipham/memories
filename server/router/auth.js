import express from "Express";
import { register, login } from "../controller/auth.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
