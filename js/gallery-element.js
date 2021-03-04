'use strict';
import images from './gallery-items.js';

const refs = {
  itemsList: document.querySelector('.js-gallery'),
  modalContainer: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  buttonClose: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector('.lightbox__content'),
  itemsMarcup: createGalleryItem(images),
};

let currentIndex = 0;

refs.itemsList.insertAdjacentHTML('beforeend', refs.itemsMarcup);

refs.itemsList.addEventListener('click', onItemLIstClick);

refs.buttonClose.addEventListener('click', onClickBtnClose);

function createGalleryItem(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
      </a>
    </li>
    `;
    })
    .join('');
}

function onItemLIstClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalContainer.classList.add('is-open');
  refs.modalImage.src = evt.target.getAttribute('data-source');
  refs.modalImage.alt = evt.target.alt;

  window.addEventListener('keydown', keyHendler);
}

function onClickBtnClose(evt) {
  evt.preventDefault();
  refs.modalContainer.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
}

// ----------------------------------------------------------------------

// function closeLightbox(evt) {
//   if (evt.target === evt.currentTarget) {
//     onClickBtnClose();
//   }
// }

// function clickKey(evt) {
//   if (evt.code === 'Escape') {
//     onClickBtnClose();
//   }
// }
