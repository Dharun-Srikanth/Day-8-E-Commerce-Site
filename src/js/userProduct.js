// Product Cards Section
const prodCardDiv = document.getElementById("user-products");
let cardDiv = "";

// Load local Storage
const retrieve = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

// Store local Storage
const save = (key, values) => {
    window.localStorage.setItem(key, JSON.stringify(values));
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
                  <h5 class="card-title fw-bold">${product.name}</h5>
                  <p>${product.price}</p>
                </div>
                
                <p class="card-text">
                  ${product.description}
                </p>
                <div class="btns d-flex justify-content-between">
                  <button class="btn btn-primary btn-md prod-add" value="${product.id}"><i class="bi bi-cart-plus-fill"></i> Add to cart</button>
                  <button class="btn btn-success btn-md buy-now" value="${product.id}"><i class="bi bi-bag-heart-fill"></i> Buy now</button>
                </div>
              </div>
              </div>`;
  }

  prodCardDiv.innerHTML = cardDiv;
};

const data = retrieve("userProducts");
loadCards(data);


// Add to cart
const addProduct = document.querySelectorAll(".prod-add");
addProduct.forEach((add) => {
  add.addEventListener("click", (e) => {
    const userProds = load("userProducts");
    let cart = retrieve("cart");
    for (let prod of userProds) {
      if (e.target.value === prod.id) {
        let index = userProds.findIndex((e) => e.id === prod.id);
        cart.push(userProds[index]);  
        save("cart",cart);
        alert("Product added to cart");
      }
    }
  });
});

// Buy now
const buyNow = document.querySelectorAll(".buy-now");
buyNow.forEach((buy) => {
  buy.addEventListener("click", (e) => {
    const userProds = load("userProducts");
    let orders = retrieve("orderStatus");
    for (let prod of userProds) {
      if (e.target.value === prod.id) {
        let index = userProds.findIndex((e) => e.id === prod.id);
        orders.push(userProds[index]);  
        save("orderStatus",orders);
        alert("Product added to orders");
      }
    }
  });
});

