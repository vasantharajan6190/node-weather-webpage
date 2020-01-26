const request =require('request')

const geoloc = (city,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?access_token=pk.eyJ1IjoibWFoYXBlcml5YXZhcjEwMCIsImEiOiJjazVkcmdjZm0xcnZvM2RyZjQxcjBqcmFrIn0.9iPjpKepyPv5wEdNmfL2Ug"
    request({ url: url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.query.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
             callback(undefined, {
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 Name: body.features[0].place_name
             })
        }
    })
}

module.exports = geoloc