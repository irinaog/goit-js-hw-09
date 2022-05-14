import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const formDate = {
    delay: form.delay.value,
    step: form.step.value,
    amount: form.amount.value,
  };

  createPromise(0, formDate.delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    amountCreatedPromise(1, formDate.amount);
    
};

function amountCreatedPromise(position, amount) {
  const formDate = {
    delay: form.delay.value,
    step: form.step.value,
    amount: form.amount.value,
  };
let time = Number(formDate.delay) + Number(formDate.step);
  const intervalId = setInterval(() => {
    if (position == amount) {
      clearInterval(intervalId);
      return
    };
    
    createPromise(position,time)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); 
      });
    time += Number(formDate.step);
    position += 1;
    
   }, formDate.step);
   
};

function createPromise(position, delay) {
  position += 1;
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay});
      };
    }, delay);
  }); 
};



// Number(delay)+Number(step)
