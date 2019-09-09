const request = require('request')

const geocode =(address,callback)=>{
     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFyc2gzNDY4IiwiYSI6ImNrMDZ1YnB2ZDAwZmczbnBxMWprbzM4NmQifQ.qPT8I0LRF080tsLJn3ZxcQ'
     request({url:url,json:true},(error,response)=>{
          if(error){
              callback("Connection Not Found",undefined)
          }
          else if(response.body.error){
              callback("Not able to find location",undefined)
          }
          else{
              callback(undefined,response.body.features[0])
          }
     })
}

module.exports = geocode