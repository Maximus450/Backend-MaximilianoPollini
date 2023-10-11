import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const viewsRouter = Router();
const product = new ProductManager();

const renderPath = {
  STATIC: "home.handlebars",
  DYNAMIC: "realTimeProducts.handlebars",
};

async function productList(req, res) {
  const allProducts = await product.getProducts();
  return {
    headerTitle: "Products",
    mainTitle: "List of products",
    products: [...allProducts],
  };
}

viewsRouter.get("/", async (req, res) => {
  const data = await productList(req, res);
  res.render(renderPath.STATIC, data);
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const data = await productList(req, res);
  data.headerTitle = "Real Time Products";
  data.mainTitle = "List of real time products";
  res.render(renderPath.DYNAMIC, data);
});

export default viewsRouter;
