const loginInp = document.getElementById('login-input')
const passwordInp = document.getElementById('pass-input')
const signInBtn = document.querySelector('.in-btn')
const signUpBtn = document.querySelector('.up-btn')



async function logJSONData() {
    const response = await fetch("http://localhost:8000/users");
    const users = await response.json();
    console.log(users)
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
  }
  logJSONData()
// console.log(users)
// location.replace("index.html")




signUpBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    console.log(123123)
    const login = loginInp.value
    const password = Number(passwordInp.value) 
    const body = {
        "login": login,
        "password": password
    }
   
})

async function reg() {
    const response = await fetch("http://localhost:8000/users");
    const users = await response.json();
    console.log(users)
    signUpBtn.addEventListener('click',(event)=>{
        event.preventDefault()
        console.log(123123)
        const login = loginInp.value
        const password = Number(passwordInp.value) 
        const body = {
            "login": login,
            "password": password
        }
        if(login && password){
            users.forEach((item)=>{
                if(item.login == login){
                    alert('Такой пользователь уже существует!')
                }
            })
            fetch('http://localhost:8000/reg', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body) 
                    })
                    alert('Пользователь создан')
                    location. reload()
        }
   
       
    })
  }

  reg()