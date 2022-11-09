const express = require('express')
const app = express()
const mongoose=require('mongoose')
const port=3000;
require('dotenv/config')
const bodyParser=require('body-parser')
var cors=require('cors')
app.use(cors());
app.use(bodyParser.json())
app.use(express.json())
const postsroute=require('./routes/posts')
app.use('/',postsroute)


// connect to mongodb
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser:true},
()=>
{
  console.log('connected to db')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



