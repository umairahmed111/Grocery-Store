var mongoose = require('mongoose')
const atlas = "mongodb+srv://muzammilahmed9595:Pass123@cluster0.0ebci9f.mongodb.net/GROCERYSTORE?retryWrites=true&w=majority"
const mongo = "mongodb://127.0.0.1:27017/VAC"
mongoose.connect(atlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log("connected to mongoose"))
    .catch((err) => { console.log(err) })

const Gross = mongoose.Schema({
    _id:String,
    Category:String,
    Item: String,
    Rate:Number,
    Quantity:Number
})

const Grocery = mongoose.model("Gross",Gross)
module.exports = Grocery