const express=require("express");
const path=require("path")
const hbs=require('hbs')
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode");
const { query } = require("express");
 const app=express()
 console.log(__dirname);
//  console.log(path.join(__dirname,"../public"))
 //app.use(express.static(path.join(__dirname,"../public")))


//Define Paths for express Config
const publicPathDirectory=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//setup Static directory to serve
app.use(express.static(publicPathDirectory))


//setup handlebars engine and Views location
app.set("view engine","hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)


//  app.get('',(req,res)=>{
// res.send('<h1>Weather</h1>');
//  })
 app.get("",(req,res)=>{
     res.render("index",{title:"Weather App", name:"Dhiraj Ray"})
 })
 app.get("/about",(req,res)=>{
     res.render("about",{
         title:"About me",
         name:"Dhiraj Ray"
     })
 })
 app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help Page",
        name:"Dhiraj Ray"
    })
})
//  app.get('/help',(req,res)=>{
//      res.send({
//          name:"Dhiraj",
//          age:"26"
//      })
//  })
//  app.get('/about',(req,res)=>{
//      res.send("<h1>About</h1>")
//  })
 app.get('/weather',(req,res)=>{
     if(!req.query.address){
         return res.send({error:"you must provide an address!"})
     }
     geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
         if(error) {return res.send({error})}
         forecast(Latitude,Longitude,(error,forecastData)=>{
             if(error){return res.send({error})} 
             res.send({forecast:forecastData,
                Location,
                address:req.query.address
            })
         })
     })
   
 })
 app.get("/products",(req,res)=>{
     if(!req.query.search){
         return res.send({error:"You must provide the search term"})
     }
    res.send({products:[]})
    console.log(req.query.search)
//  app.get('/help',(req,res)=>{
//      res.send([{name:"Tapan"},{name:"Dhiraj"}])
//  })
 //app.com
 //app.com/help
 //app.com/about
 app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Dhiraj Ray",
        myErrorMessage:"Help article not found"
 })
})

 app.get("*",(req,res)=>{
     res.render('404',{
         title:"404",
         name:"Dhiraj Ray",
         myErrorMessage:"page not found"
     })
 })
 
 })
 app.listen(3000,()=>{
     console.log("Server is up on port 3000.")
 })