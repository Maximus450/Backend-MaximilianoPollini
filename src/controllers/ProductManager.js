import { promises as fs } from "fs";
import { nanoid } from "nanoid";

export default class ProductManager {
  constructor() {
    this.path = "./src/storage/products.json";
  }

  async readProducts() {
    const products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  }

  async writeProducts(product) {
    await fs.writeFile(this.path, JSON.stringify(product));
  }

  async checkProduct(id) {
    const products = await this.readProducts();
    return products.find((prod) => prod.id === id);
  }

  async addProducts(product) {
    const productsOld = await this.readProducts();
    product.id = nanoid();
    const productsAll = [...productsOld, product];
    await this.writeProducts(productsAll);
    return "added product";
  }

  async getProducts() {
    return await this.readProducts();
  }

  async getProductsById(id) {
    const productsById = await this.checkProduct(id);
    if (!productsById) return "Product not found";
    return productsById;
  }

  async updateProducts(id, product) {
    const productsById = await this.checkProduct(id);
    if (!productsById) return "Product not found";
    await this.deleteProducts(id);
    const productOld = await this.readProducts();
    const products = [{ ...product, id: id }, ...productOld];
    await this.writeProducts(products);
    return "Updated Product";
  }

  async deleteProducts(id) {
    const products = await this.readProducts();
    const checkProduct = products.some((prod) => prod.id === id);
    if (checkProduct) {
      const filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
      return "Removed product";
    }
    return "Product for removal not found";
  }
}
