const toast = document.getElementById("toast-msg");
const toastMsg = document.getElementById("toast-text");

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
  let user = sessionStorage.getItem("user");
  for (let product of data) {
    if (product.userID === user) {
      cardDiv += `<div
      class="item d-flex justify-content-around align-items-center w-100 mt-3"
      >
      <img src="${product.img}" alt="item" height="250px" />
      <h5>${product.name}</h5>

      <div class="price">
        <p class="fs-2">${product.price}</p>
        <button class="btn btn-danger" id="${product.id}">Remove</button>
      </div>
      </div>`;
      sum += parseInt(product.price.replace(/[₹,]/g, ""));
    }
    
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
                    </div>`;
};

const data = retrieve("cart");
loadCards(data);

// Remove product from cart
for (let btn of data) {
  const removeBtn = document.getElementById(btn.id);
  if(removeBtn)
  removeBtn.addEventListener("click", () => {
    if (removeBtn.id === btn.id) {
      let index = data.findIndex((e) => e.id === btn.id);
      data.splice(index, 1);
      save("cart", data);
      location.reload();
    }
  });
}

// checkout process
const checkoutBtn = document.getElementById("checkout-btn");
if (data.length === 0) {
  checkoutBtn.classList.add("disabled");
} else {
  checkoutBtn.classList.remove("disabled");
}
checkoutBtn.addEventListener("click", () => {
  const cartData = retrieve("cart");
  let orderStatus = retrieve("orderStatus");
  let user = sessionStorage.getItem("user");
  for (let cart of cartData) {
    if(cart.userID === user)
      orderStatus.push({ ...cart, status: "Pending" });
  }
  save("orderStatus", orderStatus);
  // let indexVals = [];
  for(let vals of cartData){
    let index = data.findIndex(() => user === vals.userID);
    cartData.splice(index,1);
  }
  save("cart", cartData);
  toastMsg.innerText = "Payment successful. Check your orders page";
    toast.classList.add("d-block");
    setTimeout(() => {
      toast.classList.remove("d-block");
    }, 5000);
  window.location.href = "../../pages/User/userOrders.html";
});

// Counter
// let button = document.querySelectorAll(".my-button");
// let button2 = document.querySelectorAll(".my-button2");
// let display = document.querySelectorAll(".count");
// let count = 1;

// button.forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     console.log(e.target.value);
//     const prods = load("cart");
//     for (let prod of prods) {
//       if (e.target.value === prod.id) {
//         if (count >= 2) {
//           count--;
//           display.forEach((text) => {
//             if (e.target.value === prod.id) {
//               text.innerText = count;
//             }
//           });
//         }
//       }
//     }
//   });
// });

// button2.forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     const prods = load("cart");
//     for (let prod of prods) {
//       if (e.target.value === prod.id) {
//         count++;
//         display.innerText = count;
//       }
//     }
//   });
// });
