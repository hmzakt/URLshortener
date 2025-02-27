const express = require("express")
const urlRoute = require("./routes/url")
const {connectToMongoDB} = require("./connect")
const URL = require("./models/url")
const path = require("path")
const staticRoute = require("./routes/staticRouter")

const app = express();
const PORT = 8002;
app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/url", urlRoute)
app.use("/", staticRoute)


// app.get("/test", async(req, res)=>{
//     const allUrls = await URL.find({})
//     return res.render("home",{
//         urls : allUrls
//     })
// })

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("MongoDb connected")
})

app.listen(PORT, ()=> {
    console.log(`Server started at PORT ${PORT} !!!!!`)
}) 
