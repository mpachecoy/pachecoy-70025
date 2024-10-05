import { Router } from "express";
import CartController from "../controller/CartController.js";
import { passportCall } from "../utils.js";

export const router = Router();

router.post("/", CartController.createCart);

router.get("/:cid", passportCall("current"), CartController.getBy);

router.post("/:cid/product/:pid", passportCall("current"), CartController.addProductToCart);

router.delete("/:cid", passportCall("current"), CartController.delteCart);

router.post('/:cid/purchase', passportCall("current"), CartController.purchaseCart);





