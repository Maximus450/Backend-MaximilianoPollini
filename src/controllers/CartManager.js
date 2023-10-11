import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager();

export default class CartManager {
  constructor() {
    this.path = "./src/storage/carts.json";
  }

  async readCarts() {
    try {
      const carts = await fs.readFile(this.path, "utf-8");
      return JSON.parse(carts);
    } catch (error) {
      console.error("Error reading carts:", error);
      throw error;
    }
  }

  async writeCarts(carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.error("Error writing carts:", error);
      throw error;
    }
  }

  async checkCart(id) {
    const carts = await this.readCarts();
    return carts.find((cart) => cart.id === id);
  }

  async addCart() {
    const cartsOld = await this.readCarts();
    const id = nanoid();
    const cartToAdd = { id, products: [] };
    const cartsConcat = [cartToAdd, ...cartsOld];
    await this.writeCarts(cartsConcat);
    return "Added to cart";
  }

  async getCartById(id) {
    const cart = await this.checkCart(id);
    if (!cart) return "Cart not found";
    return cart;
  }

  async addProductInCart(cartId, productId) {
    const cartsById = await this.checkCart(cartId);
    if (!cartsById) return "Cart not found";
    const productsById = await productAll.checkProduct(productId);
    if (!cartsById) return "Product not found";
    const cartAll = await this.readCarts();
    const cartFilter = cartAll.filter((cart) => cart.id != cartId);
    if (cartsById.products.some((prod) => prod.id === productId)) {
      const productInCart = cartsById.products.find(
        (prod) => prod.id === productId
      );
      productInCart.ammount++;
      const cartsConcat = [cartsById, ...cartFilter];
      await this.writeCarts(cartsConcat);
      return "Product added to cart";
    }
    cartsById.products.push({ id: productsById.id, ammount: 1 });
    const cartsConcat = [cartsById, ...cartFilter];
    await this.writeCarts(cartsConcat);
    return "Product added to cart";
  }
}
