class ProductManager {
  constructor() {
    this.items = [];
  }

  static id = 0;

  addProduct(tittle, description, price, thumbnail, code, stock) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].code === code) {
        console.log(`The Code ${code} is repeated`);
        break;
      }
    }

    const newProduct = {
      tittle,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager.id++;
      this.items.push({ ...newProduct, id: ProductManager.id });
    } else {
      console.log("There is a missing field");
    }
  }

  getProduct() {
    return this.items;
  }

  check(id) {
    return this.items.find((product) => product.id === id);
  }

  getProductById(id) {
    !this.check(id) ? console.log("Not Found") : console.log(this.check(id));
  }
}

const products = new ProductManager();

console.log(products.getProduct());

products.addProduct("name001", "description001", 50, "img001", "asdfg", 1);
products.addProduct("name002", "description002", 50, "img002", "asdfgh", 1);

console.log(products.getProduct());

products.getProductById(1);
products.getProductById(3);


products.addProduct("name003", "description003", 50, "img003", "asdfg", 1);
products.addProduct("name003", "description003", 50, "asdfg", 1);