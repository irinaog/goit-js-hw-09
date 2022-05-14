const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
// console.dir(btnStart);



btnStart.addEventListener('click', () => { changeBcgColor() });
btnStop.addEventListener('click', () => { stopChangeBcgColor()});
let intervalId;
let isActive = false;


function changeBcgColor() {
    if (isActive) {
        return;
    };
    intervalId = setInterval(() => {
        colorSwitcher(getRandomHexColor());
        btnStart.disabled = true;
        btnStop.disabled = false;
    }, 1000); 
    isActive = true;
    
};

function stopChangeBcgColor() {
    clearInterval(intervalId);
    btnStart.disabled = false;
    btnStop.disabled = true;
    isActive = false;
}

function colorSwitcher(color) {
    const bcgBody = document.querySelector('body');
    bcgBody.style.backgroundColor = `${color}`;  
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};




