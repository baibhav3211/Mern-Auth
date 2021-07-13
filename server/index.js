const express = require('express');
const mongoose = require('mongoose');

const app = express();

//connection begins
const { MONGOURI } = require('./keys');
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("Database connected successfully!")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

//server start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})