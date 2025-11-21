function displayItem(items){
productSec.innerHTML = items.map((item)=>{
 return`
    <div class="card mb-5 mx-3">
            <img src="${item.imgUrl}" alt="${item.title}" class="card-img" />
            <div class="card-body m-auto">
                <h2 class="card-title">${item.title}</h2>
                <p>Price : $${item.price}</p>
                <p>Category : ${item.category}</p>
                <i class="fa-solid fa-heart mr-2" onClick="handleFavourite(${item.id})"></i>
                <button class="btn btn-outline-success card-btn" onClick="handleClick(${item.id})">Add To Cart</button>
            </div>
        </div>
    `
 }).join("")
}

function handleClick(id){
    e = window.event
    if (e.target.className == "btn btn-outline-success card-btn"){
        e.target.className = "btn btn-outline-danger card-btn"
        e.target.textContent = "Remove From Cart"
        addItem(id)
    }else{
        e.target.className = "btn btn-outline-success card-btn"
        e.target.textContent = "Add To Cart"
        removeItem(id)
    }
}

let productSec = document.querySelector("#product-sec")
let searchBar = document.querySelector("#search-bar")
let searchType = document.querySelector("#search-type")
searchBar.addEventListener("input" , (e)=>{
    
    let value = e.target.value.trim();
    let type = searchType.value

    switch (type){
        case"title" :
        var match = products.filter((item) => 
        item.title.toLowerCase().includes(value.toLowerCase()));
        break
        case"category" :
        var match = products.filter((item) => 
        item.category.toLowerCase().includes(value.toLowerCase()));
        break 
        default :
        var match = products
    } 
    displayItem(match)
})
displayItem(products)


