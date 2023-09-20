import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.items = "./products.txt";
    this.products = [];
  }

  static id = 0;

  async addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    await fs.writeFile(this.items, JSON.stringify(this.products));
  }

  async readProducts() {
    let reply = await fs.readFile(this.items, "utf-8");
    return JSON.parse(reply);
  }

  async getProducts() {
    let answer = await this.readProducts();
    return console.log(answer);
  }

  async check(id) {
    let response = await this.readProducts();
    return response.find((product) => product.id === id);
  }

  async getProductById(id) {
    !(await this.check(id))
      ? console.log("Not Found")
      : console.log(await this.check(id));
  }

  async deleteProductById(id) {
    let response = await this.readProducts();
    let productFilter = response.filter((products) => products.id != id);
    await fs.writeFile(this.items, JSON.stringify(productFilter));
  }

  async updateProducts({ id, ...product }) {
    await this.deleteProductById(id);
    let oldProduct = await this.readProducts();
    let modifiedProduct = [
      {
        ...product,
        id,
      },
      ...oldProduct,
    ];
    await fs.writeFile(this.items, JSON.stringify(modifiedProduct));
  }
}

const products = new ProductManager();

products.addProduct("name001", "description001", 50, "img001", "001", 1);
products.addProduct("name002", "description002", 50, "img002", "002", 1);
products.addProduct("name003", "description003", 50, "img002", "003", 1);

/* products.getProducts(); */

/* products.getProductById(1);
products.getProductById(4); */

/* products.deleteProductById(3); */

/* products.updateProducts({
  title: "name001",
  description: "description001",
  price: 100,
  thumbnail: "img001",
  code: "001",
  id: 1,
}); */
