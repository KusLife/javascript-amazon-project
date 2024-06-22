import { products, deliveryOptions } from '../data/products.js';
import { updateDeliveryOption, cart } from './cart.js';
import { priceToDecmo } from './utils/priceConvertor.js';
import { deliveryDateLogic } from './utils/dateDelivery.js';


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
    console.log(option.id ,cartItem.deliveryOptionId)
    return deliveryDays;
  });


  orderSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
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
              ${deliveryOptionsLogic(matchingProduct.id, cartItem)}
              </from>

            </div>
          </div>`;

  htmlCartContainer.innerHTML = orderSummaryHTML;
}

createItemContainer();

// Get a numbres of days and show when the item arive
// function deliveryDateLogic(deliveryDays) {
//   const today = dayjs();
//   const deliveryDate = today.add(deliveryDays, 'days').format('dddd, MMMM d');
//   console.log(deliveryDays)
//   // debugger
//   return deliveryDate;
// }

// Delivery container created by passin data and anvocking the fnc
function deliveryOptionsLogic(matchingProductId, cartItem) {
  let deliveryOptionsHTML = '';
  deliveryOptions.forEach((option) => {
    const shippingPrice = priceToDecmo(option.priceCents);

    const isChecked = option.id === cartItem.deliveryOptionId ? 'checked' : '';
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


document.querySelectorAll('.js-delivery-option').forEach((radio) => {
  radio.addEventListener('click', () => {
    const { deliveryId, productId } = radio.dataset;
    console.log(cart);
    updateDeliveryOption(productId, deliveryId)
  });
});

// document.querySelector('.delivery-options').innerHTML =

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
