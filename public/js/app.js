const para1 = document.querySelector('#message2')
const para = document.querySelector('#message1')
para1.textContent = 'Hey Welcome To Weather Web'
const weatherForm = document.querySelector('button').addEventListener('click',(e)=>{
    e.preventDefault()
    const data1 = document.querySelector('input').value
    para1.textContent ='Loading....'
    fetch('http://localhost:3000/weather?address='+data1).then((response)=>{
        response.json().then((data)=>{
         if(data.error){
            para1.textContent = data.error

         }
         else if(data1=='address'){
             para1.textContent = 'Oops! Wrong Input'
         }
         else{
             para1.textContent = data.Address 
             para.textContent = data.data
         }
        
    })})})