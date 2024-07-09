const header = document.querySelector('.header');
const menuButton = document.querySelector('.header__toggle');

const toggleMenu = () => {
    header.classList.toggle('opened');
};

menuButton.addEventListener('click', toggleMenu);