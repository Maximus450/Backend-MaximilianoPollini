import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const products = new ProductManager();

const readProducts = async () => {
  return await products.readProducts();
};

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const allProducts = await readProducts();

    if (!limit) {
      return res.send(allProducts);
    }

    const productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
  } catch (error) {
    console.error("Error reading products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allProducts = await readProducts();
    const productById = allProducts.find((product) => product.id === id);

    if (!productById) {
      return res.status(404).send("Product not found");
    }

    res.send(productById);
  } catch (error) {
    console.error("Error reading product by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Express is listening on port ${server.address().port}`);
});

server.on("error", (error) => {
  console.error("Server Error:", error);
});
