import { galleryItems } from "./gallery-items.js";

//! Step 1: Create and render gallery markup (same as in the previous task)
//* Створюємо розмітку галереї так само, як і в попередньому завданні

// const galleryList = document.querySelector(".gallery");

// function createGalleryItem(item) {
//   return `
//     <li class="gallery__item">
//       <a class="gallery__link" href="${item.original}">
//         <img
//           class="gallery__image"
//           src="${item.preview}"
//           alt="${item.description}"
//         />
//       </a>
//     </li>
//   `;
// }

// const galleryMarkup = galleryItems.map(createGalleryItem).join("");
// galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

// console.log(galleryItems);

// //! Step 2: Include the SimpleLightbox library using CDN links
// //* підключення бібліотеки SimpleLightbox - використовуємо імпорт з CDN для SimpleLightbox JS (simple-lightbox.min.js)
// import SimpleLightbox from "simplelightbox";
// //* та CSS стилів (simple-lightbox.min.css).
// import "simplelightbox/dist/simple-lightbox.min.css";

// //! Step 3: Initialize the SimpleLightbox library after gallery elements are added
// //* Ініціалізуємо бібліотеку, коли увесь контент сторінки завантажено.
// //* Це забезпечує те, що галерея буде належним чином побудована перед ініціалізацією (використовуємо DOMContentLoaded подію)
// document.addEventListener("DOMContentLoaded", function () {
//   new SimpleLightbox(".gallery a", {
//     captions: true, // Show image captions
//     captionsData: "alt", // Use "alt" attribute as caption data
//     captionPosition: "bottom", // Show captions at the bottom
//     captionDelay: 250, // Caption appears 250ms after image is shown
//   });
// });
//* При ініціалізації SimpleLightbox ми передаємо селектор '.gallery a', щоб показати, що це елементи галереї.
//*  Також передаємо об'єкт з параметрами для налаштування бібліотеки: встановлюємо параметри captions: true для відображення підписів до зображень та captionDelay: 250 для відображення підписів через 250 мілісекунд після відкриття зображення в модалці.

//! ------------------     ВАРІАНТ 2    --------------------
const galleryList = document.querySelector(".gallery");

setToGallery(createMarkup(galleryItems));

function createMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"/></a></li>`
    )
    .join("");
}

function setToGallery(gallery) {
  galleryList.innerHTML = gallery;
}
let lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
