const express = require("express")
const mongoose = require("mongoose")
const route = require("./src/routes/route")
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://PrachiSharma:H5dAJbvR7AIla7bk@newproject.ufw9pum.mongodb.net/socialmMedia",
    { useNewUrlParser: true }, mongoose.set('strictQuery', false))

    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err))

app.use("/", route)
app.use((req, res) => {
    return res.status(400).send({ status: false, message: "End point is incorrect" })
});


app.listen(process.env.PORT ||3000, function(){
    console.log("express app running on port "+(process.env.port||3000))
})

