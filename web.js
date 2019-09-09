const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const app = express()
const forecast =require('./forcast.js')
const geocode = require('./geocode.js')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
console.log(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'H.K Goel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'H.K Goel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'H.K Goel'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please Input Address'
        })}
    else{    
    geocode(req.query.address,(geocodeERROR,geocodeDATA)=>{
        if(geocodeERROR){
            return res.send(geocodeERROR)
        }
        else{
        forecast(geocodeDATA.center[1],geocodeDATA.center[0],(error,data)=>{
            if(error){
             return res.send(error)
            }
            else{
                res.send({data:data,Address:geocodeDATA.place_name})
            }        
        }
        )
        }})
    
}})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'H.K Goel',
        errorMessage: 'Help article not found.'
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.address){
        return res.send("Provide address!!!")
    }
    else{
        res.send(req.query)
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'H.K Goel',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})