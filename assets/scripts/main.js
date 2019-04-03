'use strict';

let container = document.querySelector('.container');
let gemTitle = document.querySelector('.gemstone__title').innerHTML;
let gemstoneInner = document.querySelector('.gemstone__inner');
let gemstone = document.querySelector('.gemstone');
let check = true;

let timer = () => {
    let count = 0;
    if (check) {
        let timerCount = setInterval(()=>{
            count++;
            document.querySelector('.gemstone__title').innerHTML = count;
            timerCountStop();
        }, 1000);
        let timerCountStop = () => {
            if (count > 3) {
                count = 0;
                clearInterval(timerCount);
                document.querySelector('.gemstone__title').innerHTML = gemTitle;
                check = true;
            }
        }
    }
}
gemstone.addEventListener('click', ()=>{
    container.classList.add('is-active');
    timer();
    check = false;
});

(() => {
    gemstoneInner.addEventListener('mouseenter',()=>{
        if (container.classList.contains('is-active')) {
            container.style.background = '#4b4bb1';
        }
    });
    gemstoneInner.addEventListener('mouseleave',()=>{
        if (container.classList.contains('is-active')) {
            container.style.background = 'initial';
        }
    })
})();
