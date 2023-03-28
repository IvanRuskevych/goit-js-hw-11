import { Notify } from 'notiflix';

function onFailureRequest() {
  Notify.failure(
    '"Sorry, there are no images matching your search query. Please try again."'
  );
}

function onReachedEnd() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

function showTotalNumberPhotos(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

export { onFailureRequest, onReachedEnd, showTotalNumberPhotos };
