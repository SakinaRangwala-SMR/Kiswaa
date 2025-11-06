import express from "express"
import isAuth from "../middleware/isAuth.js"
import { addToCart, UpdateCart, getUserCart } from "../controller/cartController.js"

let cartRoutes = express.Router()

cartRoutes.post("/add",isAuth,addToCart)
cartRoutes.post("/update",isAuth,UpdateCart)
cartRoutes.post("/get",isAuth,getUserCart)

export default cartRoutes
