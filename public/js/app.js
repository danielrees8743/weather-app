console.log('Client side JavaScript file loaded');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  console.log(search.value);

  messageOne.textContent = 'Loading Requested location';
  messageTwo.textContent = '';

  fetch(`http://127.0.0.1:3000/weather?address=${search.value}`).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = `${data.error}`;
          // console.error(data.error);
        } else {
          messageOne.textContent = `${data.location}`;
          messageTwo.textContent = `${data.forecast}`;
          // console.log(data.location);
          // console.log(data.forecast);
        }
      });
    }
  );
});
