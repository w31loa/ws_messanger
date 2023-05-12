
const chatContainerEL = document.querySelector(".chat__container")
const chatEL = document.getElementById("chat")
let ws= new WebSocket('ws://localhost:8000')


let myId = ''






ws.onmessage = (message) =>{
 
    document.querySelector('.users').innerHTML = ''
    const data = JSON.parse(message.data)
    // console.log(data)

    if(data.myid){
        myId = data.myid
        console.log(myId)
        document.getElementById('name_value').innerText = `${myId}`
    }

    

    if(data.message){
        const message = data.message
        console.log(message)
        const messageEL = document.createElement('div')
        const messageWrapper = document.createElement('div')
        const dateEL = document.createElement('span') 
        const nameEL = document.createElement('span') 
        const textEL = document.createElement('span') 
        
        const date = new Date
        dateEL.appendChild(document.createTextNode(`${date.getHours()}:${date.getMinutes()}`))
        messageEL.className="message"
        messageWrapper.className='message-wrapper'
        // messageEL.parentElement = 'message-wrapper'
        nameEL.appendChild(document.createTextNode(`${message.id}: `))
        textEL.appendChild(document.createTextNode(`${message.message}`))
        if(message.id == myId){
            messageWrapper.classList.add('my_message')
        }
        dateEL.classList.add('message-time')
        nameEL.classList.add('message-name')
        textEL.classList.add('message-text')
        messageWrapper.appendChild(messageEL)
        document.querySelector(`.chat-${message.id}`).appendChild(messageWrapper)
        messageEL.appendChild(nameEL)
        messageEL.appendChild(textEL)
        messageEL.appendChild(dateEL)
        nameEL.scrollIntoView({ behavior: "smooth"})
    }
   if(data.clientsOnline){
    const clientsOnline = data.clientsOnline
    document.getElementById('online_value').textContent=`Пользователей в сети: ${clientsOnline.length}`
    for(let i = 0 ; i < clientsOnline.length; i++){
        if(clientsOnline[i]!= myId){
            document.querySelector('.users').innerHTML += `<div class="user" id="${clientsOnline[i]}">${clientsOnline[i]}</div>`
            if(!document.querySelector(`.chat-${clientsOnline[i]}`)){
                chatContainerEL.innerHTML +=`<div id="chat" class="chat-${clientsOnline[i]} chats"> </div>`
            }
            
        }
    }

   }
   const usersEls = document.querySelectorAll('.user')
   const chats = document.querySelectorAll('.chats')
usersEls.forEach((item)=>{
              
    item.addEventListener('click', ()=>{
        chats.forEach((item)=>{
            item.style.display='none'
        })
        console.log('юзеры нажимаются')
        console.log(item.textContent)
        chatEL.display = 'none'
        document.querySelector(`.chat-${item.textContent}`).style.display = 'block'
    })
})
   

    // messages.forEach((val) => {
    //     // lastMessageScroll(`smooth`) 
    //     const messageEL = document.createElement('div')
    //     const dateEL = document.createElement('span') 
    //     dateEL.appendChild(document.createTextNode(`${date.getHours()}:${date.getMinutes()}`))
    //     messageEL.className="message"
    //     if(document.getElementById("name").value === val.name){
    //         messageEL.className="my_message"
    //     }
    //     messageEL.appendChild(document.createTextNode(`${val.name}: ${val.message}   `))
       
    //     chat.appendChild(messageEL)
    //     messageEL.appendChild(dateEL)
    // });
}



const formEL = document.getElementById("messageForm") 
formEL.addEventListener("submit", (event)=>{
    event.preventDefault(); //остановка отправки данных на сервер
    // const name = document.getElementById("name").value
    const from = myId
    const to = document.getElementById('collocutor').textContent
    if(to ==' '){
        alert('Вас никто не слышит!!!')
        return false
    }
    console.log(to)
    const message = document.getElementById("message").value
    if(message!=''){
        ws.send(JSON.stringify({
            'to': to,
            'from': myId,
            'message': message
        }))
        document.getElementById("message").value= ''
    // }else if(name==''){
    //     alert('Вы не указали имя!!!')
    }else{
        alert('Вы ничего не написали в сообщение!!!')
    }
   
    
    return false
});