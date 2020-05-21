const path =  require("path")
const express =  require('express')
const hbs =  require('hbs')
const geocode  = require('./utils/geo')
const forecast = require('./utils/forecast')
const app =  express()
const port =  process.env.PORT || 3000
const publicPathDir = path.join(__dirname,"../public")
const viewsPath =  path.join(__dirname,'../templates/views')
const partialsPath =  path.join(__dirname,"../templates/partials")

app.use(express.static(publicPathDir))
app.set("views",viewsPath)
app.set('view engine','hbs')

hbs.registerPartials(partialsPath)

app.get('',(req,res) =>
{
res.render('index',{
    title:"Weather App",
    name:"Kartheek"
})
})
app.get('/about',(req,res) =>
{
res.render('about',{
    title:"About me",
    name:"Kartheek Yandava"
})
})
app.get('/help',(req,res)=>
{
    res.render("help",{
        msg:"During the unprecedented COVID-19 situation, we are taking steps to protect the health of our team members and reduce the need for people to come into our offices",
        title:"Consult a Help Center",
        name:"Kartheek Yandava"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get("/help/*",(req,res)=>
{
    res.render("404",{
        title:'404',
        name:'Kartheek yandava',
        errorMessage:"Help article not found "
    })
})
app.get("*",(req,res)=>
{
    res.render('404',{
        title:'404',
        name:'Kartheek yandava',
        errorMessage:"page not found"
    })
})
app.listen(port, () =>
{
    console.log('server is running on port ' + port)
})
