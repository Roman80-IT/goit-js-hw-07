// import { galleryItems } from "./gallery-items.js";

// //! Step 1: Create and render gallery markup (same as in the previous task)
// //* Створюємо розмітку галереї так само, як і в попередньому завданні

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
// const galleryList = document.querySelector(".gallery");

// setToGallery(createMarkup(galleryItems));

// function createMarkup(galleryItems) {
//   return galleryItems
//     .map(
//       ({ preview, original, description }) =>
//         `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"/></a></li>`
//     )
//     .join("");
// }

// function setToGallery(gallery) {
//   galleryList.innerHTML = gallery;
// }
// let lightbox = new SimpleLightbox(".gallery a", {
//   captions: true,
//   captionsData: "alt",
//   captionPosition: "bottom",
//   captionDelay: 250,
// });

//! ------------------     ВАРІАНТ 3 (основний beta)   --------------------
// import { galleryItems } from "./gallery-items.js";
// const galleryList = document.querySelector(".gallery");

// function createMarkup(galleryItems) {
//   return galleryItems
//     .map(
//       ({ preview, original, description }) =>
//         `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"/></a></li>`
//     )
//     .join("");
// }

// function setToGallery(gallery) {
//   galleryList.innerHTML = gallery;
// }

// let lightbox = new SimpleLightbox(".gallery a", {
//   captions: true,
//   captionsData: "alt",
//   captionPosition: "bottom",
//   captionDelay: 250,
// });

// setToGallery(createMarkup(galleryItems));

//! ------------- Виправлення ----------------
//! "не відкривається модальне вікно, а починається скачування зображення"
//* замість відкриття модалки для перегляду зображень, відбувається скролінг сторінки. Це можливо, якщо виникає конфлікт між бібліотекою SimpleLightbox і стандартною поведінкою браузера для зображень у тегах <a>.
//* Стандартна дія посилань (зображень) не була відмінена, і браузер відкривав зображення у новому вікні замість показу модального вікна.

//* Щоб це виправити, необхідно заборонити стандартну дію посилань на зображення.
//* Для цього можна модифікувати HTML та CSS або використовувати JS:

//* Виправлення: Для відміни стандартної дії посилань, коли користувач клікає на зображення, було додано обробник події click на елементі .gallery, і цей обробник просто викликає метод preventDefault() для події.
//* Це запобігає стандартній дії посилань і зупиняє відкриття посилання в новому вікні.

//? ---------------------------------------------------------
//? Додано:
// function preventDefaultAction(event) {
//   event.preventDefault();
// }

// galleryList.addEventListener("click", preventDefaultAction);
//? ---------------------------------------------------------

//* Проблема 2 (в попередніх версіях (не бета)): Застосування SimpleLightbox було викликано раніше, ніж був згенерований HTML-код зображень галереї.
//* Виправлення: Необхідно спершу створити HTML-код зображень галереї, а потім ініціалізувати SimpleLightbox.
//* Тому було перенесено setToGallery(createMarkup(galleryItems)); нижче, після ініціалізації SimpleLightbox.

// import { galleryItems } from "./gallery-items.js";
// const galleryList = document.querySelector(".gallery");

// function createMarkup(galleryItems) {
//   return galleryItems
//     .map(
//       ({ preview, original, description }) =>
//         `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"/></a></li>`
//     )
//     .join("");
// }

// function setToGallery(gallery) {
//   galleryList.innerHTML = gallery;
// }

// //! Додати обробник події click для посилань і відмінити стандартну дію
// function preventDefaultAction(event) {
//   event.preventDefault();
// }

// galleryList.addEventListener("click", preventDefaultAction);

// let lightbox = new SimpleLightbox(".gallery a", {
//   captions: true,
//   captionsData: "alt",
//   captionPosition: "bottom",
//   captionDelay: 250,
// });

// setToGallery(createMarkup(galleryItems));

//! ------------- Виправлення 2 ----------------
//* Попередні виправлення, заборонили стандартну дію посилань, що включає відкриття посилань (зображень) у нових вікнах.
//* Але, це також перешкоджає роботі бібліотеки SimpleLightbox, яка має власну логіку для збільшення зображень при кліку.
//* Щоб виправити це, потрібно додати логіку, щоб бібліотека SimpleLightbox могла працювати як очікується, а також уникнути стандартної дії посилань.

//*    Змінено рядок створення зображень, додавши атрибут loading="lazy".
//* Це покращить завантаження зображень, але це не впливає на роботу SimpleLightbox.
//*    Створено окрему ф-цію initializeSimpleLightbox, яка додає обробник події для кожного посилання в галереї.
//* Цей обробник відмінює стандартну дію посилань і ініціалізує бібліотеку SimpleLightbox, передаючи посилання як аргумент.
//*    Після цього ініціалізуємо SimpleLightbox, використовуючи його класичний селектор ".gallery a".
//*    Завершимо, запускаючи побудову галереї, викликавши ф-цію setToGallery(createMarkup(galleryItems));.
//*    Ці зміни дозволять працювати як з SimpleLightbox, так і з галереєю.

// import { galleryItems } from "./gallery-items.js";
// const galleryList = document.querySelector(".gallery");

// function createMarkup(galleryItems) {
//   return galleryItems
//     .map(
//       ({ preview, original, description }) =>
//         `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" loading="lazy"/></a></li>`
//     )
//     .join("");
// }

// function setToGallery(gallery) {
//   galleryList.innerHTML = gallery;
// }

// // Не змінено обробник події click для посилань, відмінено стандартну дію
// function preventDefaultAction(event) {
//   event.preventDefault();
// }

// galleryList.addEventListener("click", preventDefaultAction);

// // Заключна версія функції створення SimpleLightbox
// function initializeSimpleLightbox() {
//   const galleryLinks = document.querySelectorAll(".gallery__link");
//   galleryLinks.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault();
//       new SimpleLightbox(link);
//     });
//   });
// }

// initializeSimpleLightbox();

// // створення екземпляра бібліотеки SimpleLightbox з допомогою конструктора, що дозволяє налаштувати різні параметри для модалки, яке буде використовуватись для перегляду зображень в галереї.
// const lightbox = new SimpleLightbox(".gallery a", {
//   captions: true,
//   captionsData: "alt",
//   captionPosition: "bottom",
//   captionDelay: 250,
// });

// // Запуск побудови галереї
// setToGallery(createMarkup(galleryItems));

//! ------------- Виправлення 3 ----------------
// import { galleryItems } from "./gallery-items.js";
// const galleryList = document.querySelector(".gallery");

// function createMarkup(galleryItems) {
//   return galleryItems
//     .map(
//       ({ preview, original, description }) =>
//         `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" loading="lazy"/></a></li>`
//     )
//     .join("");
// }

// function setToGallery(gallery) {
//   galleryList.innerHTML = gallery;
// }

// function initializeSimpleLightbox() {
//   const galleryLinks = document.querySelectorAll(".gallery__link");
//   galleryLinks.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault();
//       new SimpleLightbox(link.parentNode); // Змінено на parentNode для пошуку посилання на зображення
//     });
//   });
// }

// // Запускаємо ініціалізацію обробників подій
// initializeSimpleLightbox();

// const lightbox = new SimpleLightbox(".gallery a", {
//   captions: true,
//   captionsData: "alt",
//   captionPosition: "bottom",
//   captionDelay: 250,
// });

// // Запускаємо побудову галереї
// setToGallery(createMarkup(galleryItems));

//! ------------- ВАРІАНТ 4 ----------------

import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ description, preview, original }) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
             <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
       </li>`
    )
    .join("");
}

function gallerySetToHtml(gallery) {
  galleryList.innerHTML = gallery;
}

function initializeSimpleLightbox() {
  const lightbox = new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
  });
}

// Функція для створення галереї та ініціалізації SimpleLightbox
function createGallery() {
  const galleryMarkup = createGalleryMarkup(galleryItems);
  gallerySetToHtml(galleryMarkup);
  initializeSimpleLightbox();
}

// Запускаємо створення галереї з ініціалізацією SimpleLightbox
createGallery();
