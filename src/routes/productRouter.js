import { Router } from "express";
import { checkProductData  } from "../middlewares/checkProductData.middleware.js";
import ProductsController from "../controller/ProductsController.js";


export const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getBy);
router.put("/:pid", ProductsController.update);
router.post("/", checkProductData, ProductsController.create);
router.delete("/:pid", ProductsController.delete);


