var express = require('express')
var Mobile = require('./MobileModel')
const Grocery = require('./MobileModel')
var cors = require('cors')
var app = express()
app.use(express.json())
app.use(cors())
port = 8877
app.get('/getdata', async (req, res) => {
    const { Model_name, Processor, Battery, Storage, Display, Camera } = req.body
    try {
        let data = await Grocery.find()
        if (data) {
            res.status(200).send(data)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/postdata', async (req, res) => {
    data = req.body;
    try {
        const s = await Grocery(data)
        const rst = await s.save()
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})


app.delete('/deldata', async (req, res) => {
    data = req.body._id
    try {
        const d = await MobileModel.deleteOne({ _id: data })
        res.send(req.body)
    } catch (err) {
        console.log(err)
    }
    console.log(req.body._id)
})

app.put('/putdata', async (req, res) => {
    data = req.body
    try {
        const re = await MobileModel.updateOne({ _id: data._id }, {
            $set: {
                Model_name : data.Model_name,
                Processor: data.Processor,
            }
        })
        if(re){
            res.send({'message':'success',data})
        }
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`connected on port ${port}`)
})



