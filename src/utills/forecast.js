var request = require('request')
const forecast=(latitude,longitude,callback)=>{
    var url = 'https://api.darksky.net/forecast/4106e916d525ba23fe8c9bab092a2acf/' + latitude + ','+longitude
    request ({url ,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else  if(body.error){
            callback('unable to fine location.try again',undefined)
        }else{
        console.log(body.daily.data[0]);
            
        callback(undefined,`current temparature is ${body.currently.temperature} degrees.This high today is ${body.daily.data[0].temperatureHigh} with low of ${body.daily.data[0].temperatureLow} degrees and chances of rain is ${body.currently.precipIntensity}%`)
    }
    })
}


















module.exports =forecast