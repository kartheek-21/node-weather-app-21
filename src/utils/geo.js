const request = require("request")

const geocode = (address,callback) =>
{
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2FydGhlZWsyMSIsImEiOiJjazltYjdmN20wZzJyM2ttdXg5N3oydHVhIn0.TkH4_Gn7gV3Z7UOqkWL1nA'

request({url:url,json:true},(error,response)=>
{
    if(error)
    {
        callback('unable to connect to location',undefined)
    }
    else if(response.body.features.length === 0)
    {
        callback('unable to find location Try another search',undefined)
    }
     else
     {
         callback(undefined,{
              latitude: response.body.features[0].center[1],
              longitude: response.body.features[0].center[0],
              location: response.body.features[0].place_name

         })
     }
})

}

module.exports= geocode