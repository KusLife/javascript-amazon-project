import {
  products,
  deliveryOptions,
  getProductsFetch,
} from '../data/products.js';
import { updateDeliveryOption, loadCartFetch, cart } from './cart.js';
import { priceToDecmo } from './utils/priceConvertor.js';
import { deliveryDateLogic } from './utils/dateDelivery.js';
import { updateQuantityAddEvList } from './updateCheckoutQuantity.js';
import { cartItemsPriceCaunter } from './checkoutSummary.js';
import rerenderCartAddsSlide from './utils/sladerContainer.js';

function showCartOrSlider() {
  cart.length === 0 ? rerenderCartAddsSlide() : rerenderPage();
}

// asynchronius code to render the page
// 'try/catch' handle errors
async function asyncRenderPaga() {
  try {
    // throw 'error4'
    // throw('error4')
    await getProductsFetch();
    showCartOrSlider();
  } catch (error) {
    console.log('Unexpected error: pleas try again later.');
  }
}
asyncRenderPaga();

// 'fetching' and 'then' to get & render the page
// getProductsFetch()
//   .then(() => {
//     loadCartFetch();
//   })
//   .then(() => {
//     showCartOrSlider();
//   });

export function rerenderPage() {
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
    });
  }

  // Look for a radio button which is "checked"
  function orderSummary(matchingProduct, cartItem) {
    let deliveryDays;
    deliveryOptions.forEach((option) => {
      if (option.id === cartItem.deliveryOptionId) {
        deliveryDays = option.deliveryDays;
      }
      return deliveryDays;
    });
    orderSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${deliveryDateLogic(deliveryDays)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity:
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${
                      matchingProduct.id
                    }'>
                      &minus;
                    </span>
                      
                    <span class="quantity-label js-quantity-label">
                      ${cartItem.quantity}</span>
                    </span>

                   <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id='${
                      matchingProduct.id
                    }'>
                    &plus;
                  </span>
                  
                </div>
              </div>

              <from class="delivery-options">
              ${deliveryOptionsLogic(matchingProduct.id, cartItem)}
              </from>

            </div>
          </div>`;

    htmlCartContainer.innerHTML = orderSummaryHTML;
  }

  createItemContainer();

  // Delivery container created by passin data and anvocking the fnc
  function deliveryOptionsLogic(matchingProductId, cartItem) {
    let deliveryOptionsHTML = '';
    deliveryOptions.forEach((option) => {
      const shippingPrice = priceToDecmo(option.priceCents);

      const isChecked =
        option.id === cartItem.deliveryOptionId ? 'checked' : '';
      deliveryOptionsHTML += `
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProductId}"
                data-delivery-id="${option.id}">
                  <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProductId}"
                    value="${option.priceCents}"
                    aria-label="${option.name}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDateLogic(option.deliveryDays)}
                    </div>
                    <div class="delivery-option-price">
                      $${shippingPrice} ${option.name}
                    </div>
                  </div>
                </div>
  `;
    });
    return deliveryOptionsHTML;
  }
  // Radio btns listeners get a Delivery option
  document.querySelectorAll('.js-delivery-option').forEach((radio) => {
    radio.addEventListener('change', () => {
      const { deliveryId, productId } = radio.dataset;
      updateDeliveryOption(productId, deliveryId);
      rerenderPage();
    });
  });
  // Rerender delivery summary
  cartItemsPriceCaunter();
  // Readd EventListeners to update & delite btns
  updateQuantityAddEvList();
}
