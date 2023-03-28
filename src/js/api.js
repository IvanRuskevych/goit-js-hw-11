import {
  onFailureRequest,
  onReachedEnd,
  showTotalNumberPhotos,
} from './fn-notiflix';
console.log('goit-js-hw-11');

const refs = {
  form: document.querySelector('.search-form'),
  btn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onBtnSearchSubmit);
refs.btnLoad.addEventListener('click', onBtnLoadClick);
refs.btnLoad.setAttribute('hidden', true);
let searchQuery = '';
let page = 1;

function onBtnSearchSubmit(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return onFailureRequest();
  }

  resetGallery();

  fetchPhotos(searchQuery, 1).then(res => {
    if (res.totalHits === 0) {
      return onFailureRequest();
    }

    showTotalNumberPhotos(res.totalHits);
    renderGallery(res.hits);
    refs.btnLoad.removeAttribute('hidden');

    refs.btnLoad.dataset.id = 1;
    console.log(res.totalHits);

    if (Math.ceil(res.totalHits) / 40 < page) {
      refs.btnLoad.setAttribute('hidden', true);
      return onReachedEnd();
    }
  });
}

function fetchPhotos(searchQuery, page) {
  const BASE_URL = `https://pixabay.com/api/?`;

  const searchParams = new URLSearchParams({
    key: '34761066-51cba9c8f44b54f46b1644db8',
    q: searchQuery,
    orientation: 'horizontal',
    safesearch: true,
    image_type: 'photo',
    page: page,
    per_page: 40,
    lang: 'en',
  });

  return fetch(`${BASE_URL}${searchParams}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function renderGallery(items) {
  // console.log(items[0].webformatURL);
  let markup = items
    .map(
      item =>
        `<div class="photo-card">
          <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes ${item.likes}</b>
            </p>
            <p class="info-item">
              <b>Views ${item.views}</b>
            </p>
            <p class="info-item">
              <b>Comments ${item.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads ${item.downloads}</b>
            </p>
          </div>
        </div>`
    )
    .join('');
  // console.log(markup);
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function resetGallery() {
  return (refs.gallery.innerHTML = '');
}

function onBtnLoadClick() {
  page = Number(refs.btnLoad.dataset.id) + 1;
  refs.btnLoad.dataset.id = page;

  fetchPhotos(searchQuery, page).then(res => {
    renderGallery(res.hits);
    console.log(res.totalHits);

    if (Math.ceil(res.totalHits) / 40 < page) {
      refs.btnLoad.setAttribute('hidden', true);
      return onReachedEnd();
    }
  });
}
