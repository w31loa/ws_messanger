const chatEL = document.getElementById("chat")
const ws= new WebSocket('ws://127.0.0.1:8000')
ws.onmessage = (message) =>{
    const messages = JSON.parse(message.data)
    messages.forEach((val) => {
        const messageEL = document.createElement('div')
        messageEL.appendChild(document.createTextNode(`${val.name}:
        ${val.message}`))
        chat.appendChild(messageEL)
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