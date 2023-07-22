//* Імпортуємо масив з даними зображень
import { galleryItems } from "./gallery-items.js";

//// Імпортуємо файли стилів basicLightbox
//// import "basiclightbox/dist/basicLightbox.min.css";
//// Імпортуємо бібліотеку basicLightbox
//// import * as basicLightbox from "basiclightbox";

//! Step 1: Create and render gallery markup
//* Створимо розмітку галереї на підставі масиву даних 'galleryItems' і наданого шаблону елемента галереї

//  отримуємо посилання на елемент списку <ul> з класом .gallery.
const galleryList = document.querySelector(".gallery");

//! Ф-ція для створення розмітки елементів галереї
//* генеруємо рядок розмітки для кожного зображення в рядку шаблона (template string) з
//* використовуємо деструктуризацію об'єкта для отримання властивостей 'preview', 'original' та 'description' з кожного об'єкта item у масиві galleryItems.

//! -------     ВАРІАНТ 1  одним записом (map)   ---------------
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

//* Викликаємо ф-цію createGalleryItem для кожного об'єкта item у масиві galleryItems за допомогою методу .map(),
//* розмітка об'єднується (join) - створення одного рядка зі всією розміткою.

const galleryMarkup = galleryItems.map(createGalleryItem).join("");

//* додаємо розмітку до <ul>-елементу з класом '.gallery' ('insertAdjacentHTML')
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

//! Step 2: Implement the event listener for opening the modal
//* Додамо скрипт і стилі бібліотеки basicLightbox та підключимо їх за допомогою CDN

// обробник подій onGalleryItemClick на елемент <ul> з класом .gallery, що буде викликатися при кліку на дочірні елементи.
galleryList.addEventListener("click", onGalleryItemClick);

// ф-ція викликається при кліку на елемент галереї
function onGalleryItemClick(event) {
  event.preventDefault(); //* Запобігаємо перенаправленню на іншу сторінку (event.preventDefault())
  const clickedItem = event.target;

  //* Перевіряємо, чи клікнутий елемент є зображенням (<img>)
  if (clickedItem.classList.contains("gallery__image")) {
    const imageUrl = clickedItem.dataset.source; //* якщо так, то отримуємо 'URL' повнорозмірного зображення з атрибуту data-source
    openModal(imageUrl); //* викликаємо ф-цію openModal, передаючи URL зображення як аргумент.
  }
}

//! -------     ВАРІАНТ 2    ---------------
// galleryList.addEventListener("click", onGalleryItemClick);

// function onGalleryItemClick(event) {
//   event.preventDefault();
//   const clickedItem = event.target;
//   if (clickedItem.classList.contains("gallery__image")) {
//     const imageUrl = clickedItem.dataset.source;
//     openModal(imageUrl);
//   }
// }

//! Step 3: Open the modal
//* Відкриття модального вікна при кліку на елемент галереї
//! Step 4: Replace the src attribute of the modal image
//* Заміна значення атрибута 'src' елемента <img> у модальному вікні перед відкриттям.

//* Ф-ція створює модальку з повнорозмірним зображенням при кліку на мініатюру:

//* Використовуємо basicLightbox.create() для створення розмітки зображення модального вікна
// Значення атрибута src задається змінною imageUrl, яка є URL повнорозмірного зображення (отримали з даних елемента галереї при кліку)
// Коли модалка вікно відкриється за допомогою instance.show(), зображення з модального вікна отримає URL зображення, яке ми підставили в src.
// Отже, відбудеться заміна значення атрибута src елемента < img > на повнорозмірне зображення, що дозволить переглядати зображення у великому розмірі в модальному вікні.
function openModal(imageUrl) {
  const instance = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
  `);

  instance.show(); //?  відображається вікно

  //* додаємо обробник на клавіатурні події
  document.addEventListener("keydown", onModalClose);

  //! Step 5: Close the modal on Escape key press
  //* Закриття модального вікна за допомогою клавіші Escape

  function onModalClose(event) {
    if (event.code === "Escape") {
      instance.close(); //* якщо натиснуто клавішу "Escape" - закриваємо модалку (instance.close())
      document.removeEventListener("keydown", onModalClose); //* При закритті модалки відключаємо обробник з документа, щоб уникнути накопичення обробників під час множинних відкриттів та закриттів модального вікна.
    }
  }
}

console.log(galleryItems);
