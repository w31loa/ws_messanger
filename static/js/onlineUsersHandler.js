const usersEl = document.querySelector('.online_users')
const usersInnerEl = document.querySelector('.online_users_inner')
const onlineUsers = document.querySelector('.users')
const hideBtn = document.getElementById('usersBtn')
const collocutorEl = document.getElementById('collocutor')


document.addEventListener('click', (target)=>{
    console.log(target.target)
})

usersEl.addEventListener('click', ()=>{
  
    usersEl.classList.add('online_users-active')
    usersInnerEl.classList.add('online_users_inner-active')
    onlineUsers.style.display = 'flex'
    hideBtn.style.display = 'block'
    const users = document.querySelectorAll('.user')
    let counter =0
    users.forEach((item)=>{
        
        if(item.classList.contains('user-selected')){
            counter++
        }
        item.addEventListener('click', ()=>{
            // console.log(target.target)
            users.forEach((j)=>{
                if(counter>0){
                    j.classList.remove('user-selected')
                }
            })
          
            if(!item.classList.contains('user-selected')){
                item.classList.add('user-selected')
                collocutorEl.textContent = `${item.textContent}`
            }
           
        })
       
    })
  
})




hideBtn.addEventListener('click', (event)=>{
    event.stopPropagation(); 
    usersEl.classList.remove('online_users-active')
    usersInnerEl.classList.remove('online_users_inner-active')
    onlineUsers.style.display = 'none'
    hideBtn.style.display = 'none'
})


