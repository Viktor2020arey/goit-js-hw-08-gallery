import images from './gallery-items.js';
import { createGalleryItem } from './funct-create-gallery-item.js';
import { refs } from './dom-element.js';

const itemsMarcup = createGalleryItem(images);
let currentIndex = 0;

refs.itemsList.insertAdjacentHTML('beforeend', itemsMarcup);
refs.itemsList.addEventListener('click', itemsListClick);
refs.btn.addEventListener('click', closeModal);

function ModalImgSrc(src) {
  return (refs.modalImg.src = src);
}

function ModalImgAlt(alt) {
  return (refs.modalImg.alt = alt);
}

function itemsListClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  ModalImgSrc(e.target.dataset.source);
  ModalImgAlt(e.target.alt);
  currentIndex = e.target.dataset.index;
  refs.modal.classList.add('is-open');
  refs.modal.addEventListener('click', modalClick);

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
  ModalImgSrc(images[currentIndex].original);
  ModalImgAlt(images[currentIndex].description);
}

function onArrowLeft() {
  if (currentIndex - 1 < 0) {
    currentIndex = images.length - 1;
  } else {
    currentIndex -= 1;
  }
  ModalImgSrc(images[currentIndex].original);
  ModalImgAlt(images[currentIndex].description);
}

function modalClick(e) {
  if (e.target.nodeName === 'DIV') {
    closeModal();
  }
}

function closeModal() {
  window.removeEventListener('keydown', keyHendler);
  refs.modal.classList.remove('is-open');
  ModalImgSrc('');
  ModalImgAlt('');
}
