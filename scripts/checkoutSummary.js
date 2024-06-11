import { cart } from './cart.js';
import { products } from '../data/products.js';
import { priceToDecmo } from './utils/priceConvertor.js';
import { showCartQuantety } from './showCartQuantety.js';

const paymentSummaryDom = document.querySelector('.js-payment-summary');

export function cartItemsPriceCaunter() {
  let allItemsPrice = 0;
  let summaryNoTax = 0;
  let summaryWithTax = 0;
  let summaryWithShiping = 4.99;
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
  summaryNoTax = Number(priceToDecmo(allItemsPrice));
  let tenPercent = Number((summaryNoTax * 0.1).toFixed(2));
  summaryWithShiping += summaryNoTax;
  summaryWithTax = Number((summaryNoTax + tenPercent).toFixed(2));
  summaryTotal = Number((tenPercent + summaryWithShiping).toFixed(2));
  summaryWithShipingBeforTax = Number(summaryWithShiping.toFixed(2));
  // console.log(Number(summaryWithShiping.toFixed(2)));
  console.log(summaryNoTax);
  console.log(summaryWithShipingBeforTax);
  console.log(typeof summaryWithShiping);

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
            <div class="payment-summary-money">$4.99</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
`;

  paymentSummaryDom.innerHTML = orderSummaryHTML;
}
cartItemsPriceCaunter();
