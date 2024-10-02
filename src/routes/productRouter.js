import { Router } from "express";
import ProductsController from "../controller/ProductsController.js";


export const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getBy);
router.put("/:pid", ProductsController.update);
router.post("/", ProductsController.create);
router.delete("/:pid", ProductsController.delete);


