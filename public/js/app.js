const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'fdsf'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''


    fetch('http://localhost:3000/weather?address=' + location).then((Response)=>{
        Response.json().then((data)=>{
            if(data.error){
              messageOne.textContent=data.error
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    
})