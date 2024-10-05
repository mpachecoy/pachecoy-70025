import { Router } from "express";
import ProductsController from "../controller/ProductsController.js";
import { permiso } from "../middlewares/permiso.js"
import { passportCall } from "../utils.js";


export const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getBy);
router.put("/:pid", passportCall("current"), permiso("admin"), ProductsController.update);
router.post("/", passportCall("current"), permiso("admin"),  ProductsController.create);
router.delete("/:pid", passportCall("current"), permiso("admin"), ProductsController.delete);


