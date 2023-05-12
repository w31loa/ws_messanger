const loginInp = document.getElementById('login-input')
const passwordInp = document.getElementById('pass-input')
const signInBtn = document.querySelector('.in-btn')
const signUpBtn = document.querySelector('.un-btn')




const users = [
    {'login': 'alex', 'password': 123},
    {'login': 'alex1', 'password': 123},
    {'login': 'alex2', 'password': 123},
]

// location.replace("index.html")

signInBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    const login = loginInp.value
    const password = Number(passwordInp.value) 
    const body = {
        "login": login,
        "password": password
    }
    fetch('http://localhost:8000/auth', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body) 
    })
    users.forEach((item)=>{
        if(item.login == login && item.password== password){
            location.replace("http://localhost:8000/mes")
            document.querySelector('.error').style.display = 'none'
        }else{
            document.querySelector('.error').style.display = 'block'
        }
    })
    
})

