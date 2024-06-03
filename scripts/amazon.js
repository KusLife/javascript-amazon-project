import { cart, addToCart } from './cart.js';
import { products } from '../data/products.js';
import { addToCartBtn } from './addToCartBtn.js';
import { priceToDecmo } from './utils/priceConvertor.js';

/* THE element from js with products list for DOM*/
let productsHTML = '';

products.forEach((item) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${item.image}" />
      </div>

      <div class="product-name limit-text-to-2-lines">${item.name}</div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${item.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">
          ${item.rating.count}
        </div>
      </div>

      <div class="product-price">$${priceToDecmo(item.priceCents)}</div>

      <div class="product-quantity-container">
        <select class="js-cuantity-selectorId-${item.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart" id="${item.id}">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary
      js-add-to-cart-button" 
      data-product-id="${item.id}">Add to Cart</button>
    </div>
  `;
});
//Setting the lits obj as HTML
document.querySelector('.products-grid').innerHTML = productsHTML;

// const cartAddedActiv = document.querySelectorAll('.added-to-cart')

// Btn that add to the cart all items by id

// function chechQuantety() {}
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const propductCuantitySelectId = document.querySelector(
      `.js-cuantity-selectorId-${productId}`
    );
    const cuantetyValue = Number(propductCuantitySelectId.value);

    function updateCartCuantety() {
      let cartCuantety = 0;
      cart.forEach((cartItem) => {
        cartCuantety += cartItem.cuantety;
      });
      document.querySelector('.js-cart-cuantety').innerHTML = cartCuantety;
    }

    addToCart(productId, cuantetyValue);
    updateCartCuantety();
    addToCartBtn(productId);
  });
});
