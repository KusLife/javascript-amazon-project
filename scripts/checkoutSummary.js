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
    const cartProductQuantity = item.quantity;
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

  /* Add eventListener and say that cart is ampty, add red color
  but with products we place and order and navigate to the 'order' page,
  and removing the 'cart' from 'localStorage'
  */
  paymentSummaryDom.innerHTML = orderSummaryHTML;
  /*
    Get and an 'EventListener' to 'Place Your Order' Btn
    and save it to 'localStorage'
  */
  const placeOrderButton = document.querySelector('.js-place-order-button');

  placeOrderButton.addEventListener('click', async () => {
    const placeOrderPromis = await fetch(
      'https://supersimplebackend.dev/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cart: cart}),
      }
    );

    const order = await placeOrderPromis.json()
    console.log(order);

    /*      */

      if (cart.length === 0) {
        placeOrderButton.innerText = 'NO PRODUCTS IN THE CART TO PLACE AN ORDER!'
        placeOrderButton.classList.add('js-place-order-button-red')
      } else if (cart.length > 0) {
        placeOrder(order)
        window.location.href = 'orders.html'
      }
  });


   
}

// delite
cartItemsPriceCaunter();
async function getOrdersFromBack() {
    // const promiseOrders = await fetch('https://supersimplebackend.dev/orders').then((response) => {
    //   return console.log(response.json());
    // })
  }

  getOrdersFromBack()