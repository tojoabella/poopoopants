
const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:6969' : 'https://poopoopants-api.now.sh/mews'


list_all_lessons();

function list_all_lessons(){
    fetch('http://localhost:6969/lessons')
        .then(response => response.json())
        .then(lessons => {
            //reset div
            const lessons_div = document.getElementById('lessons');
            lessons_div.innerHTML = "";
            lessons.forEach(lesson => {

                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = lesson.chapter_no + '.' + lesson.lesson_no;

                const contents = document.createElement('p');
                contents.textContent = lesson.details;

                const notes = document.createElement('p');
                notes.textContent = lesson.particles;
                
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(notes);

                lessons_div.appendChild(div);

            })
        })
}

const add_new_lesson_form = document.getElementById('add_new_lesson_form');
add_new_lesson_form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form was submitted')
    const form_data = new FormData(add_new_lesson_form);

    const chapter_no = form_data.get('chapter_no');
    const lesson_no = form_data.get('lesson_no');
    const details = form_data.get('details');
    const particles = form_data.get('particles')

    const ret = {
        chapter_no,
        lesson_no, 
        details,
        particles
    };
    console.log(ret);

    fetch('http://localhost:6969/lessons', {
        method: 'POST',
        body: JSON.stringify(ret),
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then(created_lesson => {
        console.log(created_lesson);
    });

    list_all_lessons();
});
