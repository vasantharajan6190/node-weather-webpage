const request = require("request")


const forecast = (lat,lon,callback)=>{
const weatherurl = "https://api.darksky.net/forecast/0f8381fffa085e8e126019c339ce9e70/"+lat+","+lon+""


request({url:weatherurl,json:true},(error,{body})=>{
    if (error) {
        callback('Unable to connect to location services!', undefined)
    } else if (body.error) {
        callback('Unable to find location. Try another search.', undefined)
    } else {
         callback(undefined,
            "The temperature is "+body.currently.temperature+" %F"+" .The possibility for rain is "+body.currently.precipProbability)
    }
})
}
module.exports = forecast