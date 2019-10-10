var request = require('request')
const geoCode = (address,callback)=>{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoidmlub2Q3ODc4IiwiYSI6ImNrMTBxM3YwdzAwY3IzZW81Y3RjN2pzb3MifQ.ucmvixHYUMXHEotQO8MCjw&limit=1'
   request ({url,json:true},(error,{body})=>{
       if(error){
           callback('unable to connect to location services',undefined)
       }else  if(body.features.length ===0){
           callback('unable to fine location.try again',undefined)
       }else{
       callback(undefined,{
           latitude:body.features[0].center[1],
           longitude:body.features[0].center[0],
           location:body.features[0].place_name
       })
   }
})
}
module.exports = geoCode