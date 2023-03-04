const data = require("../util/dummyData")

const processedData = (req,res) => {
    let timerange = 15
    if(req.body.timerange){
        timerange = req.body.timerange
    }
let newdata=[]
let valuearray = []
valuearray= Object.keys(data["TMC"][0]["movements"])
    for(item of data["TMC"]){
        var utcSeconds =  parseInt(item["entry_date"]/1000)
        var dt= new Date(0)
        dt.setUTCSeconds(utcSeconds)
        var startDate = new Date('February 26, 2022 18:00:00');
        var subractedDate = startDate.getMinutes()
        subractedDate = new Date(startDate.getTime()- timerange*60*1000)
        subractedDate =  new Date(subractedDate.getTime() + 330*60*1000)
        for(i of valuearray){
            if(dt >= subractedDate){
                newdata.push(
                    {
                        "type" : i,
                        "date": dt.toGMTString(),
                        "value" : item["movements"][i]["v"],
                        "total" : item["movements"][i]["Total"]
                    }
                )
            }
        }
    } 
    
    let result= newdata.reduce((group,arr) => {
        const {type} = arr;
        group[type] =  group[type] ?? []
        group[type].push(arr)
        return group
    }, {})
res.json(result)
return res
}


module.exports = processedData