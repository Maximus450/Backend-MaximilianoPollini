import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import * as path from "path";

import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/carts.routes.js";
import viewsRouter from "./router/views.routes.js";

import ProductManager from "./controllers/ProductManager.js";

import { Server } from "socket.io";

const product = new ProductManager();
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

const server = app.listen(PORT, () => {
  console.log(`Express is listening on port ${server.address().port}`);
});

export const io = new Server(server);

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/", viewsRouter);

io.of("/realTimeProducts").on("connection", async (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.emit("initalProductList", product.getProducts());
  socket.on("productCreated", (productData) => {
    console.log("Created new Product", productData);
    const productItem = document.createElement("li");
    productItem.textContent = `${productData.title} - ${productData.price}`;

    const productList = document.getElementById("productList");
    productList.appendChild(productItem);
  });
});
