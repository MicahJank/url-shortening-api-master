// grabbing the hamburger button
const menuBtn = document.querySelector('.hamburger');

menuBtn.addEventListener('click', () => {
    if(menuBtn.classList.contains('is-active')) {
        menuBtn.classList.remove('is-active')
    } else {
        menuBtn.classList.add('is-active');
    }
})