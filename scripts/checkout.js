import { products } from '../data/products.js';
import { cart, removeFromCart, updateProductQuantity } from './cart.js';
import { cartItemsPriceCaunter } from './checkoutSummary.js';
import { priceToDecmo } from './utils/priceConvertor.js';

// Get an element id that was clicked and add it to the cart
const htmlCartContainer = document.getElementById('order-summary-js');
let orderSummaryHTML = '';
// Looking for matching product and creating a div for choosen item
function createItemContainer() {
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    orderSummary(matchingProduct, cartItem);
    console.log('rerid');
  });
}
// Look for a radio button which is "checked"

// const seletedRadioBtn = document.querySelector(
//   `input[name="delivery-option-${matchingProduct.id}"]:checked`
// );

// console.log(seletedRadioBtn);
function orderSummary(matchingProduct, cartItem) {
  orderSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${priceToDecmo(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${
                      cartItem.cuantety
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id='${
                    matchingProduct.id
                  }'>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${
                    matchingProduct.id
                  }'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

  htmlCartContainer.innerHTML = orderSummaryHTML;
}

createItemContainer();

// Rerender quantity in html
function rerenderItemQuantityHTML(productID) {
  const itemQuantityParent = document.querySelector(
    `.js-cart-item-container-${productID}`
  );
  const newQuantity = itemQuantityParent.querySelector('.js-quantity-label');
  cart.forEach((product) => {
    if (product.productId === productID) {
      newQuantity.innerText = product.cuantety;
    }
  });
}

// Handeling updating some objcts or quantety
document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productID = link.dataset.productId;
    updateProductQuantity(productID)
    cartItemsPriceCaunter();
    rerenderItemQuantityHTML(productID);
  });
});

// Handeling removing some objcts or quantety
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productID = link.dataset.productId;
    removeFromCart(productID);
    cartItemsPriceCaunter();
    checkOutQuantety();
    rerenderItemQuantityHTML(productID);
  });
});

// An obj and the fnc to add to acutual 'cartQuantety'
function checkOutQuantety() {
  const checkOutQuantetyHTML =
    cart.length > 1
      ? cart.length + ' ' + 'products'
      : cart.length + ' ' + 'product';
  const cartQuantety = document.querySelector('.js-return-to-home-link');
  cartQuantety.innerHTML = checkOutQuantetyHTML;
}
checkOutQuantety();
