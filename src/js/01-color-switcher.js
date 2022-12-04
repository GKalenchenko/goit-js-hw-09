function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//---------------------------------------------------------------------
let switchBodyColor = null;
const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

startBtnRef.addEventListener('click', () => {
  switchBodyColor = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnRef.setAttribute('disabled', 'disabled');
});

stopBtnRef.addEventListener('click', () => {
  clearInterval(switchBodyColor);
  startBtnRef.removeAttribute('disabled');
});
