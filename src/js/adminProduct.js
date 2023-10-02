// admin product details
const category = document.getElementById("admin-category");
const imgURL = document.getElementById("admin-imgURL");
const prodName = document.getElementById("admin-product");
const price = document.getElementById("admin-price");
const desc = document.getElementById("admin-desc");
const prodID = document.getElementById("admin-prodID");
const addBtn = document.getElementById("add");

// Product Cards Section
const prodCardDiv = document.getElementById("prod-cards");
let cardDiv = "";

// Store local Storage
const store = (key, values) => {
  window.localStorage.setItem(key, JSON.stringify(values));
};

// Load local Storage
const load = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

// Load Cards
const loadCards = (data) => {
  // loading data

  for (let product of data) {
    cardDiv += `<div class="card col-1 mx-2" style="width: 20rem">
            <img
              src="${product.img}"
              class="card-img-top p-1"
              alt="..."
            />
            <div class="card-body d-flex flex-column justify-content-end">
              <div class="title-area d-flex justify-content-between fw-bold">
                <h5 class="card-title">${product.name}</h5>
                <p>${product.price}</p>
              </div>
              
              <p class="card-text">
                ${product.description}
              </p>
              <div class="btns d-flex justify-content-between">
                <button class="btn btn-primary btn-md prod-add" value="${product.id}">Add Product</button>
                <button class="btn btn-danger btn-md prod-remove" value="${product.id}">Remove Product</button>
              </div>
            </div>
            </div>`;
  }

  prodCardDiv.innerHTML = cardDiv;
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    category.value != "" &&
    prodID.value != "" &&
    imgURL.value != "" &&
    prodName.value != "" &&
    price.value != "" &&
    desc.value != ""
  ) {
    let data1 = load("all");
    let data2 = load(category.value);

    data1.push({
      category: category.value,
      id: prodID.value,
      img: imgURL.value,
      name: prodName.value,
      price: price.value,
      description: desc.value,
    });

    data2.push({
      category: category.value,
      id: prodID.value,
      img: imgURL.value,
      name: prodName.value,
      price: price.value,
      description: desc.value,
    });

    store("all", data1);
    store(category.value, data2);

    window.location.href = "../../pages/adminPortal.html";
    alert("Product added successfully");
  }
});

const data = load("all");
loadCards(data);

// Add to user products
const addProduct = document.querySelectorAll(".prod-add");
addProduct.forEach((add) => {
  add.addEventListener("click", (e) => {
    const adminProds = load("all");
    let userProds = load("userProducts");
    console.log(userProds);
    for (let prod of adminProds) {
      if (e.target.value === prod.id) {
        let index = adminProds.findIndex((e) => e.id === prod.id);
        userProds.push(adminProds[index]);  
        store("userProducts",userProds);
        alert("Product published to user");
      }
    }
  });
});

// Remove Products
const removeProduct = document.querySelectorAll(".prod-remove");
