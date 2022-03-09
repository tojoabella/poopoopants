const express = require('express');
const cors = require('cors');
const monk = require('monk');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());
const db = monk(process.env.MONGO_URI || 'localhost:27017/poopoopants');
db.then(() => {
    console.log('Connected correctly to server')
  })
app.get('/', (req, res) => {
    res.json("the poopoopants api");
});

app.get('/lessons', (req, res) => {
    const lessons = db.get('lessons');
    lessons
        .find()
        .then(lessons => {
            res.json(lessons);
        });
});

app.post('/lessons', (req, res) => {
    const lesson = {
        chapter_no: req.body.chapter_no.toString(),
        lesson_no: req.body.lesson_no.toString(),
        details: req.body.details.toString(),
        particles: req.body.particles.toString(),
        created: new Date()
    };
    
   const lessons = db.get('lessons');
   lessons.insert(lesson)
        .then((created_lesson) => {
            res.json(created_lesson) /*return the created lesson*/
        }).catch((err) => {
            // An error happened while inserting
        });
});

app.put('/lessons', (req, res) => {

})

app.delete('/lessons', (req, res) => {
    const lessons = db.get('lessons');
    lessons.drop()
    .then(lessons => {
        res.json(lessons);
    });
});


app.listen(6969, () => {
    console.log('listening on 6969')
});
