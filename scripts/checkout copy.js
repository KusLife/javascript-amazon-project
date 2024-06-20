import { products } from '../data/products.js';
import { cart } from './cart.js';
import { priceToDecmo } from './utils/priceConvertor.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');

console.log(deliveryDate.format('dddd, MMMM D'));

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

              <from class="delivery-options">

               <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    value="0"
                    aria-label="FREE Shipping">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping

                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    value="0"
                    aria-label="FREE Shipping">
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
                    name="delivery-option-${
                      matchingProduct.id
                    }" value="499" aria-label="One Week Shipping">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - One Week Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    value="999"
                    aria-label="Express Delivery">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Express Delivery
                    </div>
                  </div>
                </div> 
                
              </from>
            </div>
          </div>`;

  htmlCartContainer.innerHTML = orderSummaryHTML;
}

createItemContainer();

function deliveryOptionsLogic() {
  let deliveryOptionsHTML;

  deliveryOptionsHTML += `
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    value="0"
                    aria-label="FREE Shipping">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
  `;

  document.querySelector('.delivery-options').innerHTML = deliveryOptionsHTML;
}

// Delivery info from radio btns seting to an arrey and show it in HTML
// let deliveryOptions = JSON.parse(localStorage.getItem('deliveryOptions'));
// let deliveryOptions = [
//   {
//     productId: 1,
//     estatedTime: 'date',
//     deliveryOptionId: 'FREE Shipping',
//     value: 0,
//   },
// ];

// if (!deliveryOptions) {
//   deliveryOptions = [
//     {
//       productId: 1,
//       estatedTime: 'date',
//       deliveryOptionId: 'FREE Shipping',
//       value: 0,
//     },
//   ];
// }

// function deliveryOptionsStorage() {
//   localStorage.setItem('deliveryOptions');
// }

// function getSetDeliveryInfo() {
//   const radioButtons = document
//     .querySelectorAll('.delivery-option-input')
//     .forEach((radio) => {
//       radio.addEventListener('change', () => {
//         deliveryOptions.forEach((option) => {
//           if (radio.name !== option.productId) {
//             deliveryOptions.push({
//               productId: radio.name,
//               estatedTime: 'date',
//               deliveryOptionId: radio.ariaLabel,
//               value: radio.value,
//             });
//             // console.log(radio);
//             console.log('new option ');
//           } else if (
//             radio.name === option.productId &&
//             option.deliveryOptionId !== radio.ariaLabel
//           ) {
//             option.productId = radio.name;
//             option.estatedTime = 'new date';
//             option.deliveryOptionId = radio.ariaLabel;
//             option.value = radio.value;
//             console.log('new option for the same product');
//             // console.log(option + ' and ' + radio);
//             // console.log(deliveryOptions);
//             console.log('times');
//           }
//         });
//         console.log(deliveryOptions);
//       });
//       // A fnc get ids to set new value oncgane to a btn,
//       //  then check if the value of the radio is not the same
//       // then get a delivery value and renew the arrey
//       // last adds new arr to old one and set it to the storage
//       // Add all option and show the summary

//       // console.log(deliveryOptions)
//     });
//   // deliveryOptions.forEach((otion) => {
//   //   console.log('Renwed ' + otion);
//   // });
//   // console.log(deliveryOptions);
// }
// getSetDeliveryInfo();
// // console.log(radioButtons)
