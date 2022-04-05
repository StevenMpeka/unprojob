const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5007
const {MONGOURI} = require('./config/keys')



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo already...")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/userbid')
require('./models/post')
require('./models/Blogpost')
require('./models/BidPost')
require('./models/Category')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/Blogpost'))
app.use(require('./routes/BidPost'))
app.use(require('./routes/categories'))
app.use(require('./routes/user'))
app.use(require('./routes/userbid'))



if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})