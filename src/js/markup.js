export { markupGallery, refs, resetGallery, showBtnLoadMore, hideBtnLoadMore };

const refs = {
  form: document.querySelector('.search-form'),
  btn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};
function markupGallery(items) {
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

function hideBtnLoadMore() {
  refs.btnLoad.setAttribute('hidden', '');
}

function showBtnLoadMore() {
  refs.btnLoad.removeAttribute('hidden');
}
