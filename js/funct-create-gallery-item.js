export function createGalleryItem(images) {
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
