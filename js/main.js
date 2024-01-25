const menuBtn = document.querySelector('.menu__btn');
const menuClose = document.querySelector('.menu__close');
const menuList = document.querySelector('.menu__list');
const menuShadow = document.querySelector('.menu--close');
const menuLinks = document.querySelectorAll('.menu__link');
const searchIcon = document.querySelector('.user-actions__item-search');
const searchInput = document.querySelector('.search-input');

menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('menu__list--open');
  menuShadow.classList.toggle('menu--open');
});

menuClose.addEventListener('click', () => {
  menuList.classList.remove('menu__list--open');
  menuShadow.classList.remove('menu--open');
});

menuLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.transition = 'color 0.3s ease';
    link.style.color = '#B8B58B';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = '';
  });
});

// Search
menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('menu__list--open');
  menuShadow.classList.toggle('menu--open');
});

menuClose.addEventListener('click', () => {
  menuList.classList.remove('menu__list--open');
  menuShadow.classList.remove('menu--open');
});

searchIcon.addEventListener('click', () => {
  searchInput.classList.toggle('is-visible');
  if (searchInput.classList.contains('is-visible')) {
    searchInput.focus();
  }
});


searchInput.addEventListener('click', (event) => {
  event.stopPropagation();
});


document.addEventListener('click', (event) => {
  if (!searchInput.contains(event.target) && !searchIcon.contains(event.target)) {
    searchInput.classList.remove('is-visible');
  }
});
