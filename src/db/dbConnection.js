const mongoose = require('mongoose');


const MONGO_URI = 'mongodb+srv://nitesh:Richmond_109@cluster0.uttybej.mongodb.net/assignment';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('db connected')
}).catch((error)=>{
    console.log('errror connecting db', error)
})