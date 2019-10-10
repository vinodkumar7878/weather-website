var request = require('request')
const forecast=(latitude,longitude,callback)=>{
    var url = 'https://api.darksky.net/forecast/4106e916d525ba23fe8c9bab092a2acf/' + latitude + ','+longitude
    request ({url ,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else  if(body.error){
            callback('unable to fine location.try again',undefined)
        }else{
        callback(undefined,`current temparature is ${body.currently.temperature} degrees and chances of rain is ${body.currently.precipIntensity}%`)
    }
    })
}


















module.exports =forecast