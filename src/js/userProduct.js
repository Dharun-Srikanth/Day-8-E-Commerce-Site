// Toast message
const toast = document.getElementById("toast-msg");
const toastMsg = document.getElementById("toast-text");

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
const loadCards = (data, id, name) => {
  console.log(id);
  // loading data

  if (id === "all" && name !== "idb") {
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
                  ${product.description.substring(0, 100)}...
                </p>
                <div class="btns d-flex justify-content-between">
                  <button class="btn btn-primary btn-md prod-add" value="${
                    product.id
                  }"><i class="bi bi-cart-plus-fill"></i> Add to cart</button>
                  <button class="btn btn-success btn-md buy-now" value="${
                    product.id
                  }"><i class="bi bi-bag-heart-fill"></i> Buy now</button>
                </div>
              </div>
              </div>`;
    }
  } else {
    for (let product of data) {
      if (product.category === id && name !== "idb") {
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
                  ${product.description.substring(0, 100)}...
                </p>
                <div class="btns d-flex justify-content-between">
                  <button class="btn btn-primary btn-md prod-add" value="${
                    product.id
                  }"><i class="bi bi-cart-plus-fill"></i> Add to cart</button>
                  <button class="btn btn-success btn-md buy-now" value="${
                    product.id
                  }"><i class="bi bi-bag-heart-fill"></i> Buy now</button>
                </div>
              </div>
              </div>`;
      }
    }
  }
  for (let product of data) {
    if (id === product.brand && name==="idb") {
      console.log(id);
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
                      ${product.description.substring(0, 100)}...
                    </p>
                    <div class="btns d-flex justify-content-between">
                      <button class="btn btn-primary btn-md prod-add" value="${
                        product.id
                      }"><i class="bi bi-cart-plus-fill"></i> Add to cart</button>
                      <button class="btn btn-success btn-md buy-now" value="${
                        product.id
                      }"><i class="bi bi-bag-heart-fill"></i> Buy now</button>
                    </div>   
                  </div>
                  </div>`;
    }
  }
  if (prodCardDiv) prodCardDiv.innerHTML = cardDiv;
};

// load cards based on key in url
const data = retrieve("userProducts");
const patternParam = window.location.search;
const urlParams = new URLSearchParams(patternParam);
let id = "all";
if (patternParam.substring(1, 4) === "idb") id = urlParams.get("idb");
else id = urlParams.get("id");

loadCards(data, id, patternParam.substring(1, 4));

// Add to cart
const addProduct = document.querySelectorAll(".prod-add");
console.log(addProduct);
addProduct.forEach((add) => {
  add.addEventListener("click", (e) => {
    const userProds = retrieve("userProducts");
    let cart = retrieve("cart");
    let user = sessionStorage.getItem("user");
    for (let prod of userProds) {
      if (e.target.value === prod.id) {
        let index = userProds.findIndex((e) => e.id === prod.id);
        cart.push({...userProds[index], userID:user});
        save("cart", cart);
        toastMsg.innerText = "Product Added to cart";
        toast.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 5000);
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
        save("orderStatus", orders);
        toastMsg.innerText = "Product Added to orders";
        toast.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 5000);
      }
    }
  });
});


// Load categories products
// All

const loginValidate = retrieve("login");

const all = document.getElementById("all");
if (all)
  all.addEventListener("click", () => {
    if (loginValidate) location.href = "pages/User/userProducts.html?id=all";
    else {
      toastMsg.innerText = "You need to login to explore more!";
      toast.classList.add("d-block");
      setTimeout(() => {
        toast.classList.remove("d-block");
      }, 3000);
    }
  });

// Mobile
const categoryKeys = retrieve("categories");
for (let btn of categoryKeys) {
  if (document.getElementById(btn.id))
    document.getElementById(btn.id).addEventListener("click", () => {
      if (loginValidate)
        location.href = `pages/User/userProducts.html?id=${btn.id}`;
      else {
        const toast = document.getElementById("toast-msg");
        const toastMsg = document.getElementById("toast-text");
        toastMsg.innerText = "You need to login to explore more!";
        toast.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 3000);
      }
    });
}

const brandKeys = retrieve("brands");
for (let btn of brandKeys) {
  if (document.getElementById(btn.name))
    document.getElementById(btn.name).addEventListener("click", () => {
      if (loginValidate)
        location.href = `pages/User/userProducts.html?idb=${btn.id}`;
      else {
        const toast = document.getElementById("toast-msg");
        const toastMsg = document.getElementById("toast-text");
        toastMsg.innerText = "You need to login to explore more!";
        toast.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 3000);
      }
    });
}


