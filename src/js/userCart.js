// Load local Storage
const retrieve = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

// Store local Storage
const save = (key, values) => {
  window.localStorage.setItem(key, JSON.stringify(values));
};

// cart Product section
const cartProd = document.getElementById("cart-products");
let cardDiv = "";

const total = document.getElementById("sub-total");


// Load Cards
const loadCards = (data) => {
  // loading data
  let sum = 0;
  for (let product of data) {
    cardDiv += `<div
                class="item d-flex justify-content-around align-items-center w-100 mt-3"
                >
                <img src="${product.img}" alt="item" height="250px" />
                <h5>${product.name}</h5>
                <div class="counter d-flex h-25 align-items-center">
                  <button id="my-button" class="btn btn-dark rounded-pill h-25 my-button" value="${product.id}">
                    -
                  </button>
                  <p id="count" class="m-5 fs-4 count">1</p>
                  <button id="my-button2" class="btn btn-dark rounded-pill h-25 my-button2" value="${product.id}">
                    +
                  </button>
                </div>
                <div class="price">
                  <p>${product.price}</p>
                  <p class="text-danger text-decoration-underline">Remove</p>
                </div>
                </div>`;
    sum+=parseInt(product.price.replace(/[₹,]/g,""));
  }
  cartProd.innerHTML = cardDiv;

  total.innerHTML = `<div class="price d-flex">
                      <p class="me-3 fs-5">Sub-Total</p>
                      <p class="fw-bold fs-5 me-5 pe-3">${sum}</p>
                    </div>

                    <div class="checkout me-5 pe-3">
                      <button id="checkout-btn" class="btn btn-dark rounded-5 px-5 w-100 m-3 fw-bold mt-3">
                        Checkout
                      </button>
                    </div>`
};

const data = retrieve("cart");
loadCards(data);

// checkout process
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", () => {
  const cartData = retrieve("cart");
  let orderStatus = retrieve("orderStatus");
  for(let cart of cartData){
    orderStatus.push({...cart, status:"Pending"});
  }
  save("orderStatus", orderStatus);
  save("cart",[]);
  alert("Payment successful! Check your order status in orders section");
  window.location.href = "../../pages/User/userOrders.html";
});


// Counter
let button = document.querySelectorAll(".my-button");
let button2 = document.querySelectorAll(".my-button2");
let display = document.querySelectorAll(".count");
let count = 1;

button.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    console.log(e.target.value);
    const prods = load("cart");
    for (let prod of prods) {
      if (e.target.value === prod.id) {
        if (count >= 2) {
          count--;
          display.forEach((text) => {
            if(e.target.value === prod.id){
              text.innerText = count;
            }
          });
        }
      }
    }
  });
});

button2.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const prods = load("cart");
    for (let prod of prods) {
      if (e.target.value === prod.id) {
        count++;
        display.innerText = count;
      }
    }
  });
});
