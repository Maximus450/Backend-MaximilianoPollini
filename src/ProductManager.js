import { promises as fs } from "fs";

export default class ProductManager {
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

/* products.addProduct("name001", "description001", 50, "img001", "001", 1);
products.addProduct("name002", "description002", 50, "img002", "002", 1);
products.addProduct("name003", "description003", 50, "img003", "003", 1);
products.addProduct("name004", "description004", 50, "img004", "004", 1);
products.addProduct("name005", "description005", 50, "img005", "005", 1);
products.addProduct("name006", "description006", 50, "img006", "006", 1);
products.addProduct("name007", "description007", 50, "img007", "007", 1);
products.addProduct("name008", "description008", 50, "img008", "008", 1);
products.addProduct("name009", "description009", 50, "img009", "009", 1);
products.addProduct("name010", "description010", 50, "img010", "010", 1); */
