const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
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

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Express app is running on port ${PORT}`)
})
