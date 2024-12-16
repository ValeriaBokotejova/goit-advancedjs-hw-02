import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.currentTarget.elements.delay.value);
  const state = event.currentTarget.elements.state.value;

  console.log(`Delay: ${delay}`);
  console.log(`State: ${state}`);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (state) {
        case 'fulfilled':
          resolve(delay);
          break;
        case 'rejected':
          reject(delay);
          break;
        default:
          reject('Invalid state');
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        icon: false,
        position: 'bottomRight',
        balloon: true,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        icon: false,
        position: 'bottomRight',
        balloon: true,
      });
    });

  event.currentTarget.reset();
});
