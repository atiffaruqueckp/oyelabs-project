const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password :{
        type:String
    },
    role :{
        type : String
    }
}, { versionKey: false })

module.exports = mongoose .model("customer", customerSchema)