import { products } from '../data/products.js';
import { cart } from './cart.js';
import { priceToDecmo} from './utils/priceConvertor.js'; 
  

const htmlCartContainer = document.getElementById('order-summary-js')
let orderSummaryHTML = '';


cart.forEach(cartItem => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product
    }
    
  })
  // console.log(matchingProduct)
  orderSummaryHTML +=
`
  <div class="cart-item-container">
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
                    Quantity: <span class="quantity-label">${cartItem.cuantety}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
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
          </div>`

        })
        htmlCartContainer.innerHTML = orderSummaryHTML




































// export function orderSummary() {
//   let productMatch;

//   // check if we get html obj
//   const orderSum = document.getElementById('order-summary-js');
//   // const orderSum = document.querySelector('.orders-link')
//   // const orderSum = document.querySelector('.page-title')
//   // if (orderSum) {
//   //   orderSum.innerHTML = 'Order placet!!!'
//   // } else {
//   //   console.error('Element with ID "order-summary" not found.');
//   // }
//   //

//   cart.forEach((cartProductId) => {
//     products.forEach((productsItem) => {
//       if (productsItem.id === cartProductId.productId) {
//         productMatch = productsItem;
//       }
//     });
//     // console.log(productMatch)
//     // const orderSummaryDOM =
//     orderSummaryHTML += `
//   <div class="cart-item-container">
//   <div class="delivery-date">
//     Delivery date: Tuesday, June 21
//   </div>

//   <div class="cart-item-details-grid">
//     <img class="product-image"
//       src="${productMatch.images}">

//     <div class="cart-item-details">
//       <div class="product-name">
//         ${productMatch.name}
//       </div>
//       <div class="product-price">
//         $${productMatch.priceCents / 100}
//       </div>
//       <div class="product-quantity">
//         <span>
//           Quantity: <span class="quantity-label">${cart.cuantety}</span>
//         </span>
//         <span class="update-quantity-link link-primary">
//           Update
//         </span>
//         <span class="delete-quantity-link link-primary">
//           Delete
//         </span>
//       </div>
//     </div>

//     <div class="delivery-options">
//       <div class="delivery-options-title">
//         Choose a delivery option:
//       </div>
//       <div class="delivery-option">
//         <input type="radio" checked
//           class="delivery-option-input"
//           name="delivery-option-1">
//         <div>
//           <div class="delivery-option-date">
//             Tuesday, June 21
//           </div>
//           <div class="delivery-option-price">
//             FREE Shipping
//           </div>
//         </div>
//       </div>
//       <div class="delivery-option">
//         <input type="radio"
//           class="delivery-option-input"
//           name="delivery-option-1">
//         <div>
//           <div class="delivery-option-date">
//             Wednesday, June 15
//           </div>
//           <div class="delivery-option-price">
//             $4.99 - Shipping
//           </div>
//         </div>
//       </div>
//       <div class="delivery-option">
//         <input type="radio"
//           class="delivery-option-input"
//           name="delivery-option-1">
//         <div>
//           <div class="delivery-option-date">
//             Monday, June 13
//           </div>
//           <div class="delivery-option-price">
//             $9. 99 - Shipping
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>`;
//   });
//   // document.querySelector('.order-summary-js').innerHTML = orderSummaryHTML;
//   // orderSum.innerHTML = orderSummaryHTML
// }

// orderSummary();
