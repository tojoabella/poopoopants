const express = require('express');
const cors = require('cors');
const monk = require('monk');

const lessons_routes = require('./api/lessons')

/*const dotenv = require('dotenv');
dotenv.config();*/

const app = express();
app.use(cors()); 
app.use(express.json());

app.use('/api/lessons', lessons_routes)

const db = monk(process.env.MONGO_URI || 'localhost:27017/poopoopants');
db.then(() => {
    console.log('Connected correctly to server')
  })

app.get('/', (req, res) => {
    res.json("the poopoopants api");
});



app.listen(6969, () => {
    console.log('listening on 6969')
});
