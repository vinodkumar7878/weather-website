const path = require('path')
const express = require('express');
const hbs =require('hbs')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')

const app=express()
const port=process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath= path.join(__dirname,'../templates/partials')
//set up handler engine and views locations
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials((partialspath))
//set up static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'vinod kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'vinod kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        helptext:'this is some helpful text',
        name:'vinod kumar'
    })
})
app.get('/weather',(req,res)=>{
    console.log(req.query.address);
    
    if(!req.query.address){
        return res.send({
            error:'you must provide a address term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     location:'rjy',
    //     forecast:'it is raining',
    //     address:req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'vinod kumar',
        errorMessage:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'vinod kumar',
        errorMessage:'page not found'
    })
})
app.listen(port,()=>{
    console.log('server running!');
    
})