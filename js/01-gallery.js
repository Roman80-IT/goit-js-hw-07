//* Імпортуємо масив з даними зображень
import { galleryItems } from "./gallery-items.js";
//! Change code below this line

// Імпортуємо файли стилів basicLightbox
// import "basiclightbox/dist/basicLightbox.min.css";

// Імпортуємо бібліотеку basicLightbox
// import * as basicLightbox from "basiclightbox";

//* Step 1: Create and render gallery markup
//* Створимо розмітку галереї на підставі масиву даних galleryItems і наданого шаблону елемента галереї
const galleryList = document.querySelector(".gallery");

//! Функція для створення розмітки елементів галереї

//! -------     ВАРІАНТ 1  (.map)   ---------------
// function createGalleryMarkup(items) {
//   return items
//     .map(
//       ({ preview, original, description }) => `
//       <li class="gallery__item">
//         <a class="gallery__link" href="${original}">
//           <img class="gallery__image" src="${preview}" alt="${description}" />
//         </a>
//       </li>
//     `
//     )
//     .join("");
// }

//! -------     ВАРІАНТ 2    ---------------
function createGalleryItem(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems.map(createGalleryItem).join("");
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

console.log(galleryItems);

//* Step 2: Implement the event listener for opening the modal
//* Додамо скрипт і стилі бібліотеки basicLightbox та підключимо їх за допомогою CDN

galleryList.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  const clickedItem = event.target;
  if (clickedItem.classList.contains("gallery__image")) {
    const imageUrl = clickedItem.dataset.source;
    openModal(imageUrl);
  }
}

//* Step 3: Open the modal
//* Реалізуємо відкриття модального вікна при кліку на елемент галереї
function openModal(imageUrl) {
  const instance = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
  `);
  instance.show();

  //* Step 4: Replace the src attribute of the modal image
  //* Забезпечимо заміну значення атрибута src елемента <img> у модальному вікні перед відкриттям.
  document.addEventListener("keydown", onModalClose);

  //* Step 5: Close the modal on Escape key press
  //* Додамо можливість закриття модального вікна за допомогою клавіші Escape.
  function onModalClose(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onModalClose);
    }
  }
}
