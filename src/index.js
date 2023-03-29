console.log('goit-js-hw-11');

import { renderGallery } from '../src/js/api';

import {
  markupGallery,
  refs,
  resetGallery,
  showBtnLoadMore,
  hideBtnLoadMore,
} from '../src/js/markup';

import {
  onFailureRequest,
  onReachedEnd,
  showTotalNumberPhotos,
  enterRequest,
} from '../src/js/notiflix';

hideBtnLoadMore();

refs.form.addEventListener('submit', onBtnSearchSubmit);
refs.btnLoad.addEventListener('click', onBtnLoadClick);

const per_page = 40;
let searchQuery = '';
let page = 1;
let currentPageNumber = refs.btnLoad.dataset.id;

async function onBtnSearchSubmit(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return enterRequest();
  }

  resetGallery();

  try {
    const photos = await renderGallery(searchQuery, 1, per_page);
    if (photos.totalHits === 0) {
      onFailureRequest();
      return hideBtnLoadMore();
    }

    showTotalNumberPhotos(photos.totalHits);
    markupGallery(photos.hits);
    showBtnLoadMore();

    currentPageNumber = 1;

    if (Math.ceil(photos.totalHits) / per_page < page) {
      hideBtnLoadMore();
      return onReachedEnd();
    }
    console.log(photos);
  } catch (error) {
    console.log(error);
  }
}

async function onBtnLoadClick() {
  page = Number(currentPageNumber) + 1;
  currentPageNumber = page;

  try {
    const photos = await renderGallery(searchQuery, page, per_page);
    markupGallery(photos.hits);
    if (Math.ceil(photos.totalHits) / per_page < page) {
      hideBtnLoadMore();
      return onReachedEnd();
    }
  } catch (error) {
    console.log(error);
  }
}
