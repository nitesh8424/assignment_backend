const mongoose = require('mongoose');


const MONGO_URI = '';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('db connected')
}).catch((error)=>{
    console.log('errror connecting db', error)
})
