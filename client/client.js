const form = document.getElementById('add_new_lesson_form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form was submitted')
    const form_data = new FormData(form);
    const lesson = form_data.get('lesson');
    const details = form_data.get('details');

    const ret = {
        lesson, 
        details
    };

    const api_url = 'http://localhost:6969/add_new_lesson';


    fetch(api_url, {
        method: 'POST',
        body: JSON.stringify(ret),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => {
            response.json();
            console.log('hi');
         })
       .then(lesson => {
           console.log('hi')
           console.log(lesson);
       });
});