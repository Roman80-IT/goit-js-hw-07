//* Імпортуємо масив з даними зображень
// import { galleryItems } from "./gallery-items.js";

//// Імпортуємо файли стилів basicLightbox
//// import "basiclightbox/dist/basicLightbox.min.css";
//// Імпортуємо бібліотеку basicLightbox
//// import * as basicLightbox from "basiclightbox";

//! Step 1: Create and render gallery markup
//* Створимо розмітку галереї на підставі масиву даних 'galleryItems' і наданого шаблону елемента галереї

//  отримуємо посилання на елемент списку <ul> з класом .gallery.
// const galleryList = document.querySelector(".gallery");

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
// function createGalleryItem(item) {
//   return `
//     <li class="gallery__item">
//       <a class="gallery__link" href="${item.original}">
//         <img
//           class="gallery__image"
//           src="${item.preview}"
//           data-source="${item.original}"
//           alt="${item.description}"
//         />
//       </a>
//     </li>
//   `;
// }

//* Викликаємо ф-цію createGalleryItem для кожного об'єкта item у масиві galleryItems за допомогою методу .map(),
//* розмітка об'єднується (join) - створення одного рядка зі всією розміткою.

// const galleryMarkup = galleryItems.map(createGalleryItem).join("");

//* додаємо розмітку до <ul>-елементу з класом '.gallery' ('insertAdjacentHTML')
// galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

//! Step 2: Implement the event listener for opening the modal
//* Додамо скрипт і стилі бібліотеки basicLightbox та підключимо їх за допомогою CDN

// обробник подій onGalleryItemClick на елемент <ul> з класом .gallery, що буде викликатися при кліку на дочірні елементи.
// galleryList.addEventListener("click", onGalleryItemClick);

// ф-ція викликається при кліку на елемент галереї
// function onGalleryItemClick(event) {
//   event.preventDefault(); //* Запобігаємо перенаправленню на іншу сторінку (event.preventDefault())
//   const clickedItem = event.target;

//   //* Перевіряємо, чи клікнутий елемент є зображенням (<img>)
//   if (clickedItem.classList.contains("gallery__image")) {
//     const imageUrl = clickedItem.dataset.source; //* якщо так, то отримуємо 'URL' повнорозмірного зображення з атрибуту data-source
//     openModal(imageUrl); //* викликаємо ф-цію openModal, передаючи URL зображення як аргумент.
//   }
// }

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
// function openModal(imageUrl) {
//   const instance = basicLightbox.create(`
//     <img src="${imageUrl}" width="800" height="600">
//   `);

//   instance.show(); //?  відображається вікно

//   //* додаємо обробник на клавіатурні події
//   document.addEventListener("keydown", onModalClose);

//! Step 5: Close the modal on Escape key press
//* Закриття модального вікна за допомогою клавіші Escape

//   function onModalClose(event) {
//     if (event.code === "Escape") {
//       instance.close(); //* якщо натиснуто клавішу "Escape" - закриваємо модалку (instance.close())
//       document.removeEventListener("keydown", onModalClose); //* При закритті модалки відключаємо обробник з документа, щоб уникнути накопичення обробників під час множинних відкриттів та закриттів модального вікна.
//     }
//   }
// }

// console.log(galleryItems);
//! ------------- Виправлення ----------------

//* не через if (clickedItem.classList.contains("gallery__image")),
//*     а if (clickedItem.nodeName !== "IMG") return або if (clickedItem.tagName !== "IMG") return
//* У нас є зручний механізм опцій у самій бібліотеці на onShow додаємо слухача на window по keydown i callbackʼом функція,
//*     яка закриває по натисненню на  ESC - а на onClose знімаємо слухача з  window і так само по keydown i callbackʼом функція,
//*     яка закриває  на  ESC:
//? ПРИКЛАД
// const instance = basicLightbox.create(html, {
//   onShow: (instance) => console.log("onShow", instance),
//   onClose: (instance) => console.log("onClose", instance),
// });
//*  Якщо ж ми знімаємо слухача тільки у функції по закриттю на  ESC то при закритті на зображення або на бекдроп
//*    слухач на ESC продовжує працювати і відбувається витік памʼяті.

//! Вихідний код:
// if (clickedItem.classList.contains("gallery__image")) {
//   const imageUrl = clickedItem.dataset.source;
//   openModal(imageUrl);
// }
//! Оновлений код:
// if (clickedItem.nodeName !== "IMG") return; // Змінив перевірку на nodeName
// const imageUrl = clickedItem.dataset.source;
// openModal(imageUrl);
//*    Пояснення:  У вихідному коді використовувалась перевірка за допомогою classList.contains("gallery__image"), щоб переконатись, що
//* клікнутий елемент має клас "gallery__image". Але це не зовсім правильний підхід, оскільки ми можемо клікати на дочірні елементи внутрішніх елементів "gallery__image",
//* що може спричинити неправильну реакцію на клік.
//*    Тому замінив цю перевірку на nodeName !== "IMG" - ми перевіряємо, чи клікнутий елемент є саме тегом <img>.
//* Це дозволяє впевнитись, що ми клікаємо саме на зображення, а не на його дочірні елементи.
//*    Якщо клікнутий елемент не є тегом < img >, то ф-ція виходить з обробки події, не викликаючи openModal(imageUrl).
//! Вихідний код:
// function openModal(imageUrl) {
//   const instance = basicLightbox.create(`
//     <img src="${imageUrl}" width="800" height="600">
//   `);

//   instance.show(); // Відображаємо вікно

//   document.addEventListener("keydown", onModalClose);

//   function onModalClose(event) {
//     if (event.code === "Escape") {
//       instance.close(); //* якщо натиснуто клавішу "Escape" - закриваємо модалку (instance.close())
//       document.removeEventListener("keydown", onModalClose);
//     }
//   }
// }
//! Оновлений код:
// function openModal(imageUrl) {
//   const instance = basicLightbox.create(
//     `<img src="${imageUrl}" width="800" height="600">`,
//     {
//       onShow: (instance) => {
//         console.log("onShow", instance);
//         document.addEventListener("keydown", onModalClose);
//       },
//       onClose: (instance) => {
//         console.log("onClose", instance);
//         document.removeEventListener("keydown", onModalClose);
//       },
//     }
//   );

//   instance.show(); // Відображаємо вікно
// }
//* Пояснення: У вихідному коді, після відкриття модалки (instance.show()), ми додаємо слухача події keydown на весь документ (document).
//* Це використовується для того, щоб перехопити клавішу "Escape" і закрити модалку. Однак, проблема в тому, що ми не знімаємо цього слухача
//* після закриття модального вікна, що може призводити до витоку пам'яті, оскільки слухач буде жити далі після того, як модальне вікно закриється.

//* Тому додав спосіб збірки опцій під час створення модального вікна (basicLightbox.create()) і додав дві callback-функції,
//* один для події onShow та інший для події onClose. У ф-ції onShow, додаю слухача keydown, а в ф-ції onClose - знімаю цього слухача з документу.
//* Це дозволяє коректно управляти слухачем і забезпечити правильне видалення його після закриття модального вікна, уникнувши витоку пам'яті.

//! ------------- Виправлений варіант ----------------
import { galleryItems } from "./gallery-items.js";
const galleryList = document.querySelector(".gallery");

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

galleryList.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  const clickedItem = event.target;

  if (clickedItem.nodeName !== "IMG") return; // Виправлено перевірку на nodeName

  const imageUrl = clickedItem.dataset.source;
  openModal(imageUrl);
}

function openModal(imageUrl) {
  const instance = basicLightbox.create(
    `<img src="${imageUrl}" width="800" height="600">`,
    {
      onShow: (instance) => {
        console.log("onShow", instance);
        document.addEventListener("keydown", onModalClose);
      },
      onClose: (instance) => {
        console.log("onClose", instance);
        document.removeEventListener("keydown", onModalClose);
      },
    }
  );

  instance.show(); // Відображаємо вікно
}

function onModalClose(event) {
  if (event.code === "Escape") {
    basicLightbox.close(); // Закриваємо модалку (basicLightbox.close())
  }
}

console.log(galleryItems);
