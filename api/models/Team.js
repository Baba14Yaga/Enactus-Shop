const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema(
    {
        title:{type :String ,  required:true , unique:true },
        titleImg:{type:String, required:true},
        desc: {type:String, required:true},
        img:{type:Array},
        cat:{type:Array},
        type:{type:String, required:true},
        childId:{type:Array},
        parentId:{type:String},

        
    },
    {
        timestamps:true
    }
)


module.exports = mongoose.model("Team",TeamSchema)