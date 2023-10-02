// search results
const search = document.getElementById("search");

const searchBtn = document.querySelectorAll(".search-btn");

searchBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let input = search.value;
    window.open(`https://www.flipkart.com/search?q=${input}`, "_blank");
    search.value = "";
  });
});
