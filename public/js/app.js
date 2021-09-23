
fetch("http://puzzle.mead.io/puzzle").then ((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})
const weatherform=document.querySelector('form');
const search=document.querySelector("input");
const messageOne=document.querySelector("#message-1")
messageTwo=document.querySelector("#message-2")
// messageOne.textContent="From javascript"
weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="....loading"
    messageTwo.textContent=""
  
fetch("/weather?address="+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        messageOne.textContent=data.error
    }
    else{
        messageOne.textContent=data.Location
        messageTwo.textContent=data.forecast
    }
})
})
})
