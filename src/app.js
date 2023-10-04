import express from "express";
import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/carts.routes.js";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter);

app.use("/api/cart", CartRouter);

const server = app.listen(PORT, () => {
  console.log(`Express is listening on port ${server.address().port}`);
});

server.on("error", (error) => {
  console.error("Server Error:", error);
});
