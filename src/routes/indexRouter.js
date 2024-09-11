import productsRuoter from "./productRouter.js";
import cartRouter from "./cartRouter.js";
import { Router } from "express";

const router = Router();

router.use("/products", productsRuoter);
router.use("/carts", cartRouter);

export default router;