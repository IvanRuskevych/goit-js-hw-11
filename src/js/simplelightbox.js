// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.photo-card a', {
  /* options */
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
});

export { lightbox };
