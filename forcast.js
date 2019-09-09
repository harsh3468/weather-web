const request = require("request")
const forecast = (latitude,longitude,callback)=>{
      const url = 'https://api.darksky.net/forecast/884f7ee63c763ce7c3dfd0ea5a6eaa05/'+latitude+','+longitude
  request({url:url,json:true},(error,response)=>{
      if(error){
         callback("Not able to connect with network",undefined)
      }
      else if(response.body.error){
         callback("Not able to find location",undefined)
      }
      else{
          callback(undefined,"Current Temp = "+ response.body.currently.temperature+", Rain Chance = "+response.body.currently.precipProbability+", Current Cond. = "+response.body.currently.summary)
      }
  })    
}

module.exports = forecast