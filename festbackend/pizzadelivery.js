const express = require('express');
const cors = require('cors');
const connectDb = require('./eventconfig/pizzaconfig')




connectDb();
const app = express();
app.use(cors());
app.use(express.json());
//
app.use('/api/event',require('./Pizzaroutes/eventsroute'));//get all event
app.use('/api/event',require('./Pizzaroutes/participationroute'))// get all the partcipant
app.use('/api/event',require('./Pizzaroutes/adminroutes'))
//


app.get('/',async(req,res)=>{
    res.send("<h1>this is from the backend after the server connection</h1>")
    console.log("nik");
    //const pizzas = await pizzamodel.find()
    //res.send("this is nikhil");
    //console.log("yaha tak sb thik hai")
    //console.log(pizzas)
    //res.send(pizzas)
     
})

app.listen(5000,()=>console.log("sever connected"))
