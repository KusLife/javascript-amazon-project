import { cart } from './cart.js';
import { deliveryOptions, products } from '../data/products.js';
import { priceToDecmo } from './utils/priceConvertor.js';
import { showCartQuantety } from './updateCartQuantity.js';
import { placeOrder } from './checkoutOrder.js';

const paymentSummaryDom = document.querySelector('.js-payment-summary');
// Variables acumulan the price and calculan all the numbers for summary
export function cartItemsPriceCaunter() {
  let allItemsPrice = 0;
  let summaryNoTax = 0;
  let summaryWithTax = 0;
  let summaryWithShiping = 0;
  let summaryShiping = 0;
  let summaryWithShipingBeforTax = 0;
  let summaryTotal = 0;

  cart.forEach((item) => {
    const cartProductQuantity = item.cuantety;
    const cartProductID = item.productId;

    products.forEach((product) => {
      const productPrice = product.priceCents;
      if (product.id === cartProductID) {
        allItemsPrice += cartProductQuantity * productPrice;
      }
    });
  });
  // Calculate cart items shiping price
  cart.forEach((cartProduct) => {
    deliveryOptions.forEach((option) => {
      if (cartProduct.deliveryOptionId === option.id) {
        summaryShiping += Number(priceToDecmo(option.priceCents));
      }
    });
  });

  summaryNoTax = Number(priceToDecmo(allItemsPrice));
  let tenPercent = Number((summaryNoTax * 0.1).toFixed(2));
  summaryWithShiping = summaryNoTax + summaryShiping;
  summaryWithTax = Number((summaryNoTax + tenPercent).toFixed(2));
  summaryTotal = Number((tenPercent + summaryWithShiping).toFixed(2));
  summaryWithShipingBeforTax = Number(summaryWithShiping.toFixed(2));

  const orderSummaryHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row js-payment-summary-items">
            <div>Items (${showCartQuantety()}):</div>
            <div class="payment-summary-money js-payment-summary-money">$${summaryNoTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${summaryShiping}</div>
          </div>

          <div class="payment-summary-row subtotal-row js-subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${summaryWithShipingBeforTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tenPercent}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${summaryTotal}</div>
          </div>
          

         <button class="place-order-button button-primary 
             js-place-order-button">
              Place your order
         </button>
          
  `;

  paymentSummaryDom.innerHTML = orderSummaryHTML;
  document
    .querySelector('.js-place-order-button')
    .addEventListener('click', () => {
      placeOrder(summaryTotal)
      // fnc removeTheCart()
    });
}
cartItemsPriceCaunter();



/*
   <button class="place-order-button button-primary 
             js-place-order-button">
              Place your order
            </button>
  

    <a href="orders.html" class="place-order-link">
      <button
        class="place-order-button button-primary
                js-place-order-button"
      >
        Place your order
      </button>
    </a>;

*/
