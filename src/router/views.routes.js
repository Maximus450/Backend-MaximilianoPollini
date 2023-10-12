import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const viewsRouter = Router();
const product = new ProductManager();

async function productList(req, res) {
  const allProducts = await product.getProducts();
  return {
    products: [...allProducts],
  };
}

viewsRouter.get("/", async (req, res) => {
  const data = await productList(req, res);
  res.render("home", data);
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
  const data = await productList(req, res);
  res.render("realTimeProducts", data);
});

export default viewsRouter;
