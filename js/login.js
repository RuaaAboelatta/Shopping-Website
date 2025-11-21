let email = document.querySelector('#email')
let password = document.querySelector('#password')
let btn = document.querySelector('#login-btn')

btn.addEventListener("click" , function(e){
    e.preventDefault()
    if(email.value ==='' || password.value ===''){
        alert('Please fill in the required data ')
    }else{
         if (email.value && email.value.trim() === localStorage.getItem('email') && password.value && password.value.trim() === localStorage.getItem('password') ){
            setTimeout(()=>{
                window.location = 'index.html'
            },1000)
        }else{
            alert('Invalid email or password')
        }
    }
})