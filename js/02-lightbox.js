import { galleryItems } from "./gallery-items.js";

//* Step 1: Create and render gallery markup (same as in the previous task)
//* Створюємо розмітку галереї так само, як і в попередньому завданні

const galleryList = document.querySelector(".gallery");

function createGalleryItem(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems.map(createGalleryItem).join("");
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

console.log(galleryItems);
