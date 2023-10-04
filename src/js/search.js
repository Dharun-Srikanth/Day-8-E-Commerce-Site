// search results
const search = document.getElementById("search");
const values = document.getElementById("results");

const searchBtn = document.querySelectorAll(".search-btn");

// brands, categories, user products
const brandsList = JSON.parse(localStorage.getItem("brands"));
const categoryList = JSON.parse(localStorage.getItem("categories"));
const userProductList = JSON.parse(localStorage.getItem("userProducts"));
let check = true;
searchBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let id = "";
    let query = "id";
    let input = search.value;
    if(check){
      for(let b of brandsList){
        if(b.name === input){
          id = b.id;
          query = "idb"
          check = false;
          break;
        }
      }
    }
    if(check){
      for(let c of categoryList){
        if(c.name === input){
          id = c.id;
          check = false;
          break;
        }
      }
    }

    window.location.href = `pages/User/userProducts.html?${query}=${id}`;
    
    // window.open(`https://www.flipkart.com/search?q=${input}`, "_blank");
    search.value = "";
  });
});
