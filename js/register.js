let fname = document.querySelector('#fname')
let lname = document.querySelector('#lname')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let btn = document.querySelector('#sub-btn')


btn.addEventListener("click" , function(e){
    e.preventDefault()
    if(fname.value ==='' || lname.value ==='' || email.value ==='' || password.value ==='' ){
        alert('please fill in the required data')
    }else{
        localStorage.setItem("firstName",fname.value)
        localStorage.setItem("lastName",lname.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
        alert('account is successfully created ')
        window.location = "login.html"
    }
})