let links = document.querySelector('#links');
let hello = document.querySelector('#hello')
let fname = localStorage.getItem('firstName')
let logged = document.querySelector('#loggedin');
if (localStorage.getItem('firstName')) {
    links.remove();
    logged.style.display ='flex'
    hello.innerHTML = 'Hello, '+ fname
}

let logoutBtn = document.querySelector("#logout-btn")
logoutBtn.addEventListener("click" , ()=>{
    localStorage.clear()
    setTimeout(() => {
        window.location = "index.html"
    }, 1000);
})