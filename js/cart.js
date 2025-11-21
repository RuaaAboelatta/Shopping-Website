let cartItemCon = document.querySelector("#cart-item-con");
function displayCartItem(items) {    
    cartItemCon.innerHTML = items.map((item) => {
        return `
        <div class="card col-5 p-0 mb-4 flex-row">
            <img src="${item.imgUrl}" alt="${item.title}" class="cart-img"/>
            <div class="card-body m-auto">
                <h2 class="card-title">${item.title}</h2>
                <p>Price : $${item.price * item.quantity}</p>
                <p>Category : ${item.category}</p>
                <span class="btn btn-outline-secondary py-0 px-2" onClick ="decQuantity(${item.id})">-</span>
                <span class="item-quan">${item.quantity}</span>
                <span class="btn btn-outline-secondary py-0 px-2" onClick ="incQuantity(${item.id})">+</span>
                <button class="btn btn-outline-danger card-btn ml-2" onClick="remove(${item.id})">Remove From Cart</button>
            </div>
        </div>`
    }).join("");
}
let favItemCon = document.querySelector("#favourite-item-con")
let favItems = localStorage.getItem("favouriteItems") ? JSON.parse(localStorage.getItem('favouriteItems')) : [];

function displayFav(items){
    favItemCon.innerHTML= items.map((item)=>{
        return`
            <div class="card col-3 m-3 p-0">
            <img src="${item.imgUrl}" alt="${item.title}" class="card-img"/>
            <div class="card-body m-auto text-center">
                <h2 class="card-title">${item.title}</h2>
                <p>Category : ${item.category}</p>
                <i class="fa-solid fa-heart text-danger mr-2" onClick="handleFavourite(${item.id})"></i>
            </div>
        </div>
        `
    }).join("")
}


function handleFavourite(id){
    if (localStorage.getItem("firstName")) {
        let favItem = products.find((item) => item.id === id);
        let isFavourite = favItems.find((item) => item.id === id);
        let e = window.event;
        
        if (!isFavourite) {
            favItems = [...favItems, favItem];
             e.target.className = "fa-solid fa-heart text-danger mr-2";
        } else {
            favItems = favItems.filter((item)=> item.id != id)
            e.target.className = "fa-solid fa-heart mr-2"
            if (favItemCon) {
                displayFav(favItems);
            }
        }
        localStorage.setItem("favouriteItems", JSON.stringify(favItems));
    } else {
        window.location = "login.html";
    }
}
if (favItemCon){
    displayFav(favItems)
}

function calcTotal(items){
    let totalPrice = 0
    items.forEach(item => {
        totalPrice += item.price * item.quantity
    });
    totalPriceCon.innerHTML = "Total Price : $" + totalPrice
}
let cart = document.querySelector("#cart");
let productsNum = document.querySelector("#product-Num");
let totalPriceCon = document.querySelector("#total-price")
function addToCart(items) {
    if (!cart) return;
    
    cart.innerHTML = items.map((item) => {
        return `
        <div class="d-flex justify-content-between bg-light rounded p-2 mb-1">
            <div>
                <p>${item.title}</p>
                <span class="btn btn-outline-secondary py-0 px-2" onClick = "decQuantity(${item.id})">-</span>
                <span class="item-quan">${item.quantity}</span>
                <span class="btn btn-outline-secondary py-0 px-2" onClick = "incQuantity(${item.id})">+</span>
            </div>
            <div>
                <span>Price:</span>
                <p class="mt-2">$${item.price * item.quantity}</p>
            </div>
        </div>`
    }).join("");
   

    if (productsNum) {
        productsNum.innerHTML = cartItems.length;
    }
}

function handleClick(id) {
    let e = window.event;
    if (e.target.className == "btn btn-outline-success card-btn") {
        e.target.className = "btn btn-outline-danger card-btn";
        e.target.textContent = "Remove From Cart";
        addItem(id);
    } else {
        e.target.className = "btn btn-outline-success card-btn";
        e.target.textContent = "Add To Cart";
        removeItem(id);
    }
}

let cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) : [];
let itemsInCart = JSON.parse(localStorage.getItem("cartItems")) || [];
function addItem(id) {
    if (localStorage.getItem("firstName")) {
        let choosenItem = products.find((item) => item.id === id);
        let existInCart = cartItems.find((item) => item.id === id);
        
        if (!existInCart) {
            cartItems = [...cartItems, { ...choosenItem, quantity: 1 }];
        } else {
            cartItems = cartItems.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        itemsInCart = cartItems;
        addToCart(cartItems);
        calcTotal(cartItems)
        
        if (cartItemCon) {
            displayCartItem(itemsInCart);
        }
    } else {
        window.location = "login.html";
    }
}

function removeItem(id) {
    if (localStorage.getItem("firstName")) {
        cartItems = cartItems.filter((item) => item.id != id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        itemsInCart = cartItems;
        addToCart(cartItems);
        calcTotal(cartItems)

        
        if (cartItemCon) {
            displayCartItem(itemsInCart);
        }
    }
}

function remove(id) {
    itemsInCart = itemsInCart.filter((item) => item.id != id);
    cartItems = itemsInCart; 
    localStorage.setItem("cartItems", JSON.stringify(itemsInCart));
    displayCartItem(itemsInCart);
    addToCart(cartItems);
    calcTotal(cartItems)

}

function incQuantity(id) {
    let cartItem = cartItems.find((item) => item.id == id);
    if (cartItem) {
        cartItem.quantity++;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        itemsInCart = cartItems;
        addToCart(cartItems);
        calcTotal(cartItems);

        
        if (cartItemCon) {
            displayCartItem(itemsInCart);
        }
    }
}

function decQuantity(id) {
    let cartItem = cartItems.find((item) => item.id == id);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            itemsInCart = cartItems;
            calcTotal(cartItems);
            addToCart(cartItems);
            
            if (cartItemCon) {
                displayCartItem(itemsInCart);
                
            }
        } else {
            removeItem(id);
        }
    }
}

let cartIcon = document.querySelector(".cart-icon");
let cartCon = document.querySelector(".cart-con");
if (cartIcon && cartCon) {
    cartIcon.addEventListener('click', () => {
        if (cartCon.style.display == "none" || !cartCon.style.display) {
            cartCon.style.display = "flex";
        } else {
            cartCon.style.display = "none";
        }
    });
}

if (cartItemCon) {
    displayCartItem(itemsInCart);
}
addToCart(cartItems);
calcTotal(cartItems);