const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();
app.use(cors()); 
app.use(express.json());

const db = monk('localhost/poopoopants');
const lessons = db.get('lessons');

app.get('/', (req, res) => {
    res.json({
        message: "hi"
    });
});

app.post('/add_new_lesson', (req, res) => {
    
    const lesson = {
        lesson_no: req.body.lesson.toString(),
        details: req.body.details.toString(),
        created: new Date()
    };
    console.log(lesson);
    
   /*const lesson = req.body;*/
   lessons
        .insert(lesson)
        .then(created_lesson => {
            console.log(created_lesson);
            res.json(created_lesson);
        });
});

app.listen(6969, () => {
    console.log('listening on 6969')
});
