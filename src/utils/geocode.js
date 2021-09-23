const request=require("request")


const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGhpcmFqMTk5NSIsImEiOiJja3RsMXNqMXgwMmVxMnltdDZmdWpoYnRrIn0.UG9lflS9KkE-VNumk3Llhw&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect with Location service",undefined)
        }
        else if(body.features.length===0){
            callback("unable to find the location",undefined)
        }
        else{
            callback(undefined,{Longitude:body.features[0].center[0],
               Latitude:body.features[0].center[1],
               Location:body.features[0].place_name

            })
        }
    })
}
module.exports=geoCode;