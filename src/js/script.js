// Category load
const categoryArea = document.getElementById("category-area");

const categoryData = JSON.parse(localStorage.getItem("categories"));
let categoriesDiv = "";

for(let data of categoryData){
    categoriesDiv += `<figure id="${data.id}">
                        <img
                        src="${data.imgURL}"
                        alt="${data.name}"
                        height="50px"
                        />
                        <figcaption class="mt-1">${data.name}</figcaption>
                    </figure>`;
}

if(categoryArea)
categoryArea.innerHTML = categoriesDiv;

// Brand load
const brandArea = document.getElementById("brand-area");
const brandData = JSON.parse(localStorage.getItem("brands"));
let brandsDiv = "";

for(let data of brandData){
    brandsDiv += `<div class="card pt-2 me-2 brandCard" id="${data.name}" style="width: 18rem; height: 12rem">
                    <img
                    src="${data.imgURL}"
                    class="card-img-top p-3 pt-4"
                    alt="${data.name}"
                    />
                </div>`;
}

if(brandArea)
brandArea.innerHTML = brandsDiv;

