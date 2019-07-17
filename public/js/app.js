console.log('Client Side JS File Loaded');
const
    inputParameter = document.querySelector('input'),
    weatherForm = document.querySelector('form'),
    message1 = document.querySelector('#msg-1'),
    message2 = document.querySelector('#msg-2'),
    message3 = document.querySelector('#msg-3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Reset Message Values on successive searches
    message1.textContent = 'Fetching Data...Please Wait...';
    message2.textContent = '';
    message3.textContent = '';



    let location = !inputParameter.value ? 'Broomfield, Colrado' : inputParameter.value;
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.errMsg) {
                message1.textContent = (data.title).concat(': ', data.errMsg);
            } else {
                const {location, summary, forecastMessage} = data;
                message1.textContent = location;
                message2.textContent = summary;
                message3.textContent = forecastMessage;
            }
        });
    });
    inputParameter.value = '';
});