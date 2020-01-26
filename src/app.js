const path = require("path")
const hbs = require("hbs")
const express = require("express")
const request = require("request")
const geoloc = require("./util/geoloc.js")
const forecast = require("./util/forecast.js")
const app = express()
//define paths for express
const path12 = path.join(__dirname,"../public")
const viewspath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")
hbs.registerPartials(partialspath)
//handlebars path
app.set('view engine','hbs')
app.set('views',viewspath)
//static path
app.use(express.static(path12))

app.get("/",(req,res)=>{
    res.render('index',{
        title:"weather app",
        name:"vasanth"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"help page",
        name:"help created by vasanth"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about page",
        name:"about created by vasanth"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
          return res.send("enter address")
    }
    geoloc(req.query.address,(error,{latitude,longitude,Name}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({error})
            }
            res.send({
            Name,
            data
            })
       })
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"help",
        name:"vasanth",
        errorMessage:"help article not found"
    })
})
app.get("/product",(req,res)=>{
    if(!req.query.search){
       return res.send("enter extra")
    }
    res.send({
        products:[]
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"vasanth",
        errorMessage:"page Not found"
    })
})



app.listen(3000,()=>{
    console.log("server started")
})