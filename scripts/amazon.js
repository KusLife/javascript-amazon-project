import { addToCart } from './cart.js';
import { getProductsFetch, products } from '../data/products.js';
import { addToCartBtn } from './cartBtns.js';
import { showCartQuantety, updateCartQuantity } from './updateCartQuantity.js';
import './cars.js';

// render with "fetch"
getProductsFetch().then(() => {
  renderAmazonGid()
})

const cartQuantityHTML =  document.querySelector('.js-cart-quantity').innerHTML = showCartQuantety();


function renderAmazonGid() {
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
          src="${item.getStarsURL()}"
        />
        <div class="product-rating-count link-primary">
          ${item.rating.count}
        </div>
      </div>

      <div class="product-price">${item.getPrice()}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selectorId-${item.id}">
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

      ${item.getMoreInfoHtml()}

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

  // Btn that add to the cart all items by id
  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const propductCuantitySelectId = document.querySelector(
        `.js-quantity-selectorId-${productId}`
      );
      const quantityValue = Number(propductCuantitySelectId.value);

      addToCart(productId, quantityValue);
      addToCartBtn(productId);
      updateCartQuantity();
    });
  });
  updateCartQuantity();
}
