var express = require('express'),
router = express.Router();

const monk = require('monk');
const db = monk(process.env.MONGO_URI || 'localhost:27017/poopoopants');

router.get('/test', (req, res) => {
    res.json("hellow");
});

router.get('/', (req, res) => {
    const lessons = db.get('lessons');
    lessons
        .find()
        .then(lessons => {
            res.json(lessons);
        });
});

router.post('/', (req, res) => {
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

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {
    const lessons = db.get('lessons');
    lessons.drop()
    .then(lessons => {
        res.json(lessons);
    });
});

module.exports = router;
