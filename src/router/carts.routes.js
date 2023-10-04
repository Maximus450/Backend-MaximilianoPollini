import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const cartManager = new CartManager();

CartRouter.post("/", async (req, res) => {
  try {
    const result = await cartManager.addCart();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error creating a new cart");
  }
});

CartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartManager.readCarts();
    res.send(carts);
  } catch (error) {
    res.status(500).send("Error fetching carts");
  }
});

CartRouter.get("/:id", async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await cartManager.getCartById(cartId);
    if (cart === "Cart not found") {
      res.status(404).send(cart);
    } else {
      res.send(cart);
    }
  } catch (error) {
    res.status(500).send("Error fetching cart by ID");
  }
});

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    res.send(await cartManager.addProductInCart(cartId, productId))
  });

export default CartRouter;
