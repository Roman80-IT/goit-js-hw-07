//? Створення галереї зображень на веб-сторінці.
//*    Генерує HTML - розмітку для кожного зображення зі списку galleryItems, вставляє цю розмітку в HTML - структуру
//*    та налаштовує спливаючі вікна для зображень за допомогою бібліотеки SimpleLightbox.

import { galleryItems } from "./gallery-items.js";

//* Вибираємо HTML-елемент з класом "gallery" і зберігаємо його у змінній `galleryList`.
const galleryList = document.querySelector(".gallery");

//*  Викликаємо ф-цію `createGalleryMarkup`, передаючи їй масив об'єктів `galleryItems`.
//*    Ця функція створює розмітку для галереї на основі об'єктів з масиву.
const galleryMarkup = createGalleryMarkup(galleryItems);

//* Викликаємо функцію gallerySetToHtml, передаючи їй згенеровану розмітку.
//* Ця функція встановлює згенеровану розмітку внутрішнім HTML вмістом елемента з класом "gallery".
gallerySetToHtml(galleryMarkup);

//* Створюємо екземпляр SimpleLightbox, передаючи селектор ".gallery a".

//*     SimpleLightbox - бібліотека для створення легких спливаючих вікон для зображень.
//* Ми також налаштовуємо параметри, такі як підписи, позиція підпису та затримка підпису.
let lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt", // Використовуємо атрибут 'alt' зображення як підпис.
  captionPosition: "bottom", // Позиція підпису - знизу.
  captionDelay: 250, // Затримка перед відображенням підпису (у мілісекундах).
});

//* Функція для створення розмітки галереї на основі масиву об'єктів galleryItems.
function createGalleryMarkup(galleryItems) {
  //* Використовуємо метод масиву map для обробки кожного об'єкта в масиві.
  //* Деструктуризуємо об'єкт для отримання властивостей description, preview та original.
  return (
    galleryItems
      .map(
        ({ description, preview, original }) =>
          // Створюємо розмітку для кожного зображення у галереї.
          `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
             <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
       </li>`
      )
      // Перетворюємо масив розміток у рядок, об'єднуючи їх без проміжків.
      .join("")
  );
}

//* Функція для встановлення розмітки галереї внутрішнім HTML вмістом елемента з класом "gallery".
function gallerySetToHtml(gallery) {
  galleryList.innerHTML = gallery;
}
