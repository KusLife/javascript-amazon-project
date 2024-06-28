import { products } from '../data/products.js';
import { priceToDecmo } from './utils/priceConvertor.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

// Slider for ampty cart

function rerenderCartAddsSlide() {
  const sladerContainer = document.getElementById('order-summary-js');
  function sladerItems() {
    let html = '';
    products.forEach((product) => {
      html += `
    <div class="swiper-slide"> 
       <img src='${product.image}' class='swiper-img'>
      <div class="swiper-slide-discription">
        <h4  class="title">${product.name}</h4>
        <p>Pice: $${priceToDecmo(product.priceCents)}</p>
      </div>
    </div>
    `;
    });
    return html;
  }
  // console.log(sladerItems());
  let html = `
  <div class="swiper">
    <div class="swiper-wrapper">
       ${sladerItems()}
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    </div>
    `;
  sladerContainer.innerHTML = html;
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    initialSlide: 4,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 14,
    autoplay: {
      deley: 1000,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export default rerenderCartAddsSlide
