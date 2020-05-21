const request =  require('request')
const foreCAst = (latitute,longitude,callback)=>
{
const url = 'http://api.weatherstack.com/current?access_key=53daa32c794b9b32c97c95187be189c8&query=' + latitute + ',' + longitude
request({url:url,json:true},(error,{body})=>
{
    if(error)
    {
        callback('unable to connect to weather server',undefined)
        
    }
    else if(body.error)
    {
     callback('unable to find',undefined)
    }
    else
    {
    callback(undefined,body.current.weather_descriptions[0]+',it is currently '+body.current.temperature+' but it feels like '+body.current.feelslike+' outside. The humidity is '+body.current.humidity +" %")
    }
})
}

module. exports = foreCAst