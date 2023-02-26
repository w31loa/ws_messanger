const chatEL = document.getElementById("chat")
const ws= new WebSocket('ws://127.0.0.1:8000')

function lastMessageScroll(b) {
    var e = document.querySelector('.wrapper_Scrollbottom');
    if (!e) return ; 
    
    e.scrollIntoView({
        behavior: b || 'auto',
        block: 'end',
    });
}
const date = new Date

ws.onmessage = (message) =>{
    
    
    const messages = JSON.parse(message.data)
    if (typeof(messages) == 'number'){
        document.getElementById('online_value').textContent=`Пользователей в сети: ${messages}`
    }
    
 
    messages.forEach((val) => {
        lastMessageScroll(`smooth`)
        const messageEL = document.createElement('div')
        const dateEL = document.createElement('span') 
        dateEL.appendChild(document.createTextNode(`${date.getHours()}:${date.getMinutes()}`))
        messageEL.className="message"
        if(document.getElementById("name").value === val.name){
            messageEL.className="my_message"
        }
        messageEL.appendChild(document.createTextNode(`${val.name}: ${val.message}   `))
       
        chat.appendChild(messageEL)
        messageEL.appendChild(dateEL)
    });
}




const formEL = document.getElementById("messageForm")
formEL.addEventListener("submit", (event)=>{
    event.preventDefault(); //остановка отправки данных на сервер
    const name = document.getElementById("name").value
    const message = document.getElementById("message").value
    if(name&&message!=''){
        ws.send(JSON.stringify({
            name, message
        }))
        document.getElementById("message").value= ''
    }else if(name==''){
        alert('Вы не указали имя!!!')
    }else{
        alert('Вы ничего не написали в сообщение!!!')
    }
   
    
    return false
});