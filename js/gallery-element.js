import images from './gallery-items.js';

const itemsList = document.querySelector('.js-gallery');
const modal = document.querySelector('.lightbox');
const btn = document.querySelector('.lightbox__button');
const modalImg = document.querySelector('.lightbox__image');

const itemsMarcup = createGalleryItem(images);
let currentIndex = 0;

itemsList.insertAdjacentHTML('beforeend', itemsMarcup);
itemsList.addEventListener('click', itemsListClick);
btn.addEventListener('click', closeModal);

function createGalleryItem(images) {
  return images
    .map(({ preview, original, description }, ind) => {
      return `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${preview}"
    >
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        data-index ="${ind}"
    />
    </a>
</li>`;
    })
    .join('');
}

function itemsListClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  modalImg.src = e.target.dataset.source;
  modalImg.alt = e.target.alt;
  currentIndex = e.target.dataset.index;
  modal.classList.add('is-open');
  modal.addEventListener('click', modalClick);

  window.addEventListener('keydown', keyHendler);
}

function keyHendler(e) {
  const key = e.code;
  switch (key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowRight':
      onArrowRight();
      break;
    case 'ArrowLeft':
      onArrowLeft();
      break;
  }
}

function onArrowRight() {
  if (currentIndex + 1 > images.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  modalImg.src = images[currentIndex].original;
  modalImg.alt = images[currentIndex].description;
}

function onArrowLeft() {
  if (currentIndex - 1 < 0) {
    currentIndex = images.length - 1;
  } else {
    currentIndex -= 1;
  }
  modalImg.src = images[currentIndex].original;
  modalImg.alt = images[currentIndex].description;
}

function modalClick(e) {
  if (e.target.nodeName === 'DIV') {
    closeModal();
  }
}

function closeModal() {
  window.removeEventListener('keydown', keyHendler);
  modal.classList.remove('is-open');
  modalImg.src = '';
  modalImg.alt = '';
}
