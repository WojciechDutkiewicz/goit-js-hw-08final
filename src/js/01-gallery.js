// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const gallery = document.querySelector('.gallery');

for (const pic of galleryItems) {
  const item = `<a class="gallery__item" href="${pic.original}">
  <img class="gallery__image" src="${pic.preview}" alt="${pic.description}" />
  </a>`;
  gallery.insertAdjacentHTML('beforeend', item);
}

gallery.addEventListener('click', ev => {
  ev.preventDefault();
  if (ev.target.tagName !== 'IMG') {
    return;
  }
  var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
});
