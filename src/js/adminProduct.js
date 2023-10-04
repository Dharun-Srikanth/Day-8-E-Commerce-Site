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

// const categories = [
//   { id: 1, name: "Mobile", imgURL: "src/images/categories/mobile-phone.png" },
//   { id: 2, name: "Men's Wear", imgURL: "src/images/categories/men.png" },
//   { id: 3, name: "Women's Wear", imgURL: "src/images/categories/dress.png" },
//   { id: 4, name: "Grocery", imgURL: "src/images/categories/grocery.png" },
//   { id: 5, name: "Games", imgURL: "src/images/categories/game.png" },
//   { id: 6, name: "Food", imgURL: "src/images/categories/food.png" },
// ];

// const brands = [
//   { id:1, name:"KFC", imgURL:"src/images/Brands/kfc.png" },
//   { id:2, name:"Allen Solly", imgURL:"src/images/Brands/allen-solly.jpg" },
//   { id:3, name:"XBOX", imgURL:"src/images/Brands/xbox.png" },
//   { id:4, name:"Samsung", imgURL:"src/images/Brands/samsung.png" },
//   { id:5, name:"Raymond", imgURL:"src/images/Brands/raymond.jpg" },
// ];

// window.addEventListener("load", () => {
//   store("brands", brands);
//   store("categories", categories);
// });

// ---------------------------------------------------------------------

// Load Category
const categoryDiv = document.getElementById("category-section");
let categoryValues = `<select
                    id="admin-category"
                    class="form-select"
                    aria-label="Default select example"
                    >`;
const loadCategory = (data) => {
  for (let category of data) {
    categoryValues += `<option value="${category.id}">${category.name}</option>`;
  }
  categoryValues += `</select>`;
  categoryDiv.innerHTML = categoryValues;
};

loadCategory(load("categories"));

// Load Brands
const brandDiv = document.getElementById("brand-section");
let brandValues = `<select
                    id="admin-brand"
                    class="form-select"
                    aria-label="Default select example"
                    >
                    <option selected value="0">Select</option>`;
const loadBrands = (data) => {
  for (let brand of data) {
    brandValues += `<option value="${brand.id}">${brand.name}</option>`;
  }
  brandValues += `</select>`;
  brandDiv.innerHTML = brandValues;
};

loadBrands(load("brands"));

// -------------------------------------------------------------------------

// Load Cards
const loadCards = (data) => {
  // loading data

  for (let product of data) {
    cardDiv += `<div class="card col-1 mx-2" style="width: 19rem">
            <img
              src="${product.img}"
              class="card-img-top p-1"
              alt="..."
            />
            <button class="btn btn-warning btn-sm prod-edit text-center fw-bold" data-bs-toggle="modal"
            data-bs-target="#productModal" value="${
              product.id
            }"><img src="../src/images/edit.png" height="32px"> Edit</button>
            <div class="card-body d-flex flex-column justify-content-end mt-0">
              <div class="title-area d-flex justify-content-between fw-bold">
                <h5 class="card-title">${product.name}</h5>
                <p>${product.price}</p>
              </div>
              
              <p class="card-text">
                ${product.description.substring(0, 80)}
              </p>
              <div class="btns d-flex justify-content-between">
                <button class="btn btn-primary btn-sm prod-add" value="${
                  product.id
                }">Add Product</button>
                <button class="btn btn-danger btn-sm prod-remove" value="${
                  product.id
                }">Remove Product</button>
              </div>
            </div>
            </div>`;
  }

  prodCardDiv.innerHTML = cardDiv;
};

// admin product details
const category = document.getElementById("admin-category");
const brand = document.getElementById("admin-brand");
const imgURL = document.getElementById("admin-imgURL");
const prodName = document.getElementById("admin-product");
const price = document.getElementById("admin-price");
const desc = document.getElementById("admin-desc");
const prodID = document.getElementById("admin-prodID");
const addBtn = document.getElementById("add");
const toast = document.getElementById("toast-msg");
const toastMsg = document.getElementById("toast-text");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    category.value != "" &&
    brand.value != "" &&
    prodID.value != "" &&
    imgURL.value != "" &&
    prodName.value != "" &&
    price.value != "" &&
    desc.value != ""
  ) {
    let data1 = load("all");

    data1.push({
      category: category.value,
      brand: brand.value,
      id: prodID.value,
      img: imgURL.value,
      name: prodName.value,
      price: price.value,
      description: desc.value,
    });

    store("all", data1);
    toastMsg.innerText = "Product Added Succesfully";
    toast.classList.add("d-block");
    setTimeout(() => {
      toast.classList.remove("d-block");
    }, 1000);
    setTimeout(() => {
      window.location.href = "../../pages/adminPortal.html";
    }, 2000);
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
        store("userProducts", userProds);
        toastMsg.innerText = "Product Added Succesfully";
        toast.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 1000);
      }
    }
  });
});

// Remove Products
const removeProduct = document.querySelectorAll(".prod-remove");
removeProduct.forEach((remove) => {
  remove.addEventListener("click", (e) => {
    const adminProds = load("all");
    let userProds = load("userProducts");
    console.log(userProds);
    for (let prod of adminProds) {
      if (e.target.value === prod.id) {
        let index = adminProds.findIndex((e) => e.id === prod.id);
        adminProds.splice(index, 1);
        userProds.splice(index, 1);
        store("userProducts", userProds);
        store("all", adminProds);
        alert("Product removed");
        location.reload();
      }
    }
  });
});

// Edit product
const editProduct = document.querySelectorAll(".prod-edit");
editProduct.forEach((edit) => {
  edit.addEventListener("click", (e) => {
    addBtn.innerText = "Update Product";
    let allProducts = load("all");
    let found = [];
    for (let prod of allProducts) {
      if (e.target.value === prod.id) {
        let index = allProducts.findIndex((e) => e.id === prod.id);
        found = allProducts[index];
      }
    }
    imgURL.value = found.img;
    prodName.value = found.name;
    price.value = found.price;
    desc.value = found.description;
    prodID.value = found.id;
    category.value = found.category;
    brand.value = found.brand;

    let index = allProducts.findIndex((e) => e.id === event.target.value);
    addBtn.addEventListener("click", () => {
      allProducts[index] = {
        category: category.value,
        brand: brand.value,
        id: prodID.value,
        img: imgURL.value,
        name: prodName.value,
        price: price.value,
        description: desc.value,
      };
      store("all", allProducts);
    });
  });
});

// const category = document.getElementById("admin-category");
// const brand = document.getElementById("admin-brand");
// const imgURL = document.getElementById("admin-imgURL");
// const prodName = document.getElementById("admin-product");
// const price = document.getElementById("admin-price");
// const desc = document.getElementById("admin-desc");
// const prodID = document.getElementById("admin-prodID");
// const addBtn = document.getElementById("add");
// const toast = document.getElementById("toast-msg");
// const toastMsg = document.getElementById("toast-text");
