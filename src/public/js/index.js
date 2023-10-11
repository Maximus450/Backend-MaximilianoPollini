const template = `
  <h2>{{mainTitle}}</h2>
  {{#each products}}
    <h3>{{this.tittle}}</h3>
    <p>{{this.description}}</p>
    <p>{{this.price}}</p>
    <p>{{this.thumbnail}}</p>
    <p>{{this.code}}</p>
    <p>{{this.stock}}</p>
  {{/each}}
`;

function createProductListTemplate(data) {
  return compileTemplate({
    headerTitle: "Home | Products",
    mainTitle: "List of products in Real Time",
    products: data.products,
  });
}

function handleUpdateList(data) {
  console.log(data);
  if (container) {
    container.innerHTML = createProductListTemplate(data);
  }
}

const socket = io("http://localhost:8080");
const container = document.getElementById("container") ?? null;
const compileTemplate = Handlebars.compile(template);

socket.on("updateList", handleUpdateList);
