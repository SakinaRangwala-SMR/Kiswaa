import express from "express"
import { logout, registration, login, googleLogin, adminLogin  } from "../controller/authController.js";
const authRoutes = express.Router()

authRoutes.post("/registration", registration);

authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/logout", logout);
authRoutes.post("/googlelogin", googleLogin);
authRoutes.post("/adminlogin", adminLogin);

export default authRoutes;