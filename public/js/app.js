console.log("client side js")

const weatherform=document.querySelector("form")
const loc=document.querySelector("input")
const result= document.getElementById("result")
const err=document.getElementById("err")
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const value=loc.value
    result.textContent = "loading..."
    err.textContent= ""
    fetch('/weather?address='+value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                result.textContent=data.error
            }
            else{
                result.textContent="Location: "+data.Name;
                err.textContent="Forecast: "+data.data;
            }
            
        })
    })
})