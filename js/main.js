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

// Подписка на рассылку:
document.addEventListener('DOMContentLoaded', function () {
  const mailingListForm = document.querySelector('.mailing-list__form');
  const messageBox = document.querySelector('.mailing-list__message');

  mailingListForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.querySelector('.mailing-list__email').value;
    const isConsentChecked = document.querySelector('.checkbox').checked;

    if (!emailInput) {
      showMessage('Please enter your email.', 'error');
      return;
    }

    if (!isConsentChecked) {
      showMessage('Please consent to data processing.', 'error');
      return;
    }


    sendSubscriptionData(emailInput, isConsentChecked);
    showMessage('Thank you for subscribing!', 'success');
  });
});

function showMessage(message, type) {
  const messageBox = document.querySelector('.mailing-list__message');
  messageBox.textContent = message;
  messageBox.style.display = 'block';
  messageBox.className = 'mailing-list__message ' + type;
}

function sendSubscriptionData(email) {
  fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      showMessage('Thank you for subscribing!', 'success');
    })
    .catch((error) => {
      showMessage('Error: ' + error.message, 'error');
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('teaMap').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const teaLocations = [
    { lat: 35.8617, lng: 104.1954, info: 'China - The cradle of traditional Chinese tea' },
    { lat: 22.3193, lng: 114.1694, info: 'Hong Kong - Famous for its milk tea' },
    { lat: 23.6978, lng: 120.9605, info: 'Taiwan - Known for high-quality Oolong teas' },
    { lat: 35.6762, lng: 139.6503, info: 'Japan - Renowned for Matcha and Sencha green teas' },
    { lat: 27.5142, lng: 90.4336, info: 'Bhutan - Unique high mountain teas' },
    // European Tea Locations
    { lat: 37.7412, lng: -25.6756, info: 'Azores, Portugal - Home to some of the oldest tea plantations in Europe' },
    { lat: 50.2660, lng: -5.0527, info: 'Cornwall, UK - The first commercial tea producer in Britain' },
    { lat: 43.7696, lng: 11.2558, info: 'Tuscany, Italy - Emerging European tea producer' },
    { lat: -21.1151, lng: 55.5364, info: 'Réunion, France - Exotic tea production in France' }

  ];

  teaLocations.forEach(function (location) {
    L.marker([location.lat, location.lng]).addTo(map)
      .bindPopup(location.info);
  });
});

