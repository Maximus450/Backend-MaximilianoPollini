import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router();
const product = new ProductManager();

async function emitUpdateList(io) {
  const allProducts = await product.getProducts();
  io.emit("updateList", {
    products: allProducts,
  });
}

ProductRouter.get("/", async (req, res) => {
  res.send(await product.getProducts());
});

ProductRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.send(await product.getProductsById(id));
});

ProductRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  await product.addProducts(newProduct);
  await emitUpdateList(req.io);
  res.sendStatus(201);
});

ProductRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateProduct = req.body;
  await product.updateProducts(id, updateProduct);
  await emitUpdateList(req.io);
  res.sendStatus(200);
});

ProductRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await product.deleteProducts(id);
  await emitUpdateList(req.io);
  res.sendStatus(204);
});

export default ProductRouter;
