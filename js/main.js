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

// Анимация для элементов навигации
menuLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.transition = 'color 0.3s ease';
    link.style.color = '#B8B58B';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = '';
  });
});

// Поиск по нажатию на иконку поиска
menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('menu__list--open');
  menuShadow.classList.toggle('menu--open');
});

menuClose.addEventListener('click', () => {
  menuList.classList.remove('menu__list--open');
  menuShadow.classList.remove('menu--open');
});

// Открытие поиска по клику на иконку
searchIcon.addEventListener('click', () => {
  searchInput.classList.toggle('is-visible');
  if (searchInput.classList.contains('is-visible')) {
    searchInput.focus(); // Автоматически фокусируемся на поле ввода
  }
});

// Предотвращаем закрытие поля поиска при клике на него
searchInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Скрытие поля поиска при клике вне его области
document.addEventListener('click', (event) => {
  if (!searchInput.contains(event.target) && !searchIcon.contains(event.target)) {
    searchInput.classList.remove('is-visible');
  }
});
