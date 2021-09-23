const request=require("request");
const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=218ede3b9e346f77b79daa870f198e92&query='+ lat + ',' + long +'&units=m'
    request({url,json:true},(error,{body})=>{
if(error){
    callback("Unable to connect with location services! Please check your connection",undefined)
}
else if(body.error){
    callback("Unable to find the weather information for the location! please search another",undefined)
}
else{
    callback(undefined,body.current.weather_descriptions + " It is currently " + body.current.temperature +" °c "+ " and feels like " + body.current.feelslike+" °c")
       
        
}
    })
}
module.exports=forecast;
