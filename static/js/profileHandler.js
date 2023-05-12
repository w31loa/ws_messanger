const profileEl = document.querySelector('.profile')
const profileInnerEl = document.querySelector('.profile_inner')
const hideBtn = document.getElementById('profileBtn')
const exitBtn = document.getElementById('exitBtn')


profileEl.addEventListener('click', ()=>{
    profileEl.classList.add('profile-active')
    profileInnerEl.classList.add('profile_inner-active')
    hideBtn.style.display = 'block'
    exitBtn.style.display = 'block'
    
})


hideBtn.addEventListener('click', (event)=>{
    event.stopPropagation(); 
    profileEl.classList.remove('profile-active')
    profileInnerEl.classList.remove('profile_inner-active')
    hideBtn.style.display = 'none'
    exitBtn.style.display = 'none'
})

exitBtn.addEventListener('click', ()=>{
    location.replace("http://localhost:8000/")
})


