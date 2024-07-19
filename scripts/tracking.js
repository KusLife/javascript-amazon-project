import ordersData from '../data/ordersData.js';
import { getProductsFetch, products } from '../data/products.js';
import { showCartQuantety } from './updateCartQuantity.js';
import { deliveryDateForamt } from './utils/dateDelivery.js';

getProductsFetch().then(() => {
  trackingContainer();
});

const trackingHTML = document.querySelector('.js-main');
const trackingCartQuantityHTML = document.querySelector('.js-track-cart-quantity').innerText = showCartQuantety()

export function trackingContainer() {
  const url = new URL(window.location.href);
  const orderIdURL = url.searchParams.get('orderId');
  const productIdURL = url.searchParams.get('productId');
  let productDeliveryTime = '';
  let productQuantity = 0;
  let productName = '';
  let productIMG = '';

  ordersData.forEach((order) => {
    // console.log(1);

    if (orderIdURL === order.id) {
      // console.log(2);

      order.products.forEach((orderItem) => {
        productDeliveryTime = deliveryDateForamt(
          orderItem.estimatedDeliveryTime
        );
        if (orderItem.productId === productIdURL) {
          productQuantity = orderItem.quantity;
          // console.log(3);

          products.forEach((product) => {
            if (product.id === productIdURL) {
              // console.log(4);

              productName = product.name;
              productIMG = product.image;
            }
          });
          // console.log(5);
          const html = `
            <div class="order-tracking">
              <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
              </a>

              <div class="delivery-date">
                ${productDeliveryTime}
              </div>

              <div class="product-info">
                ${productName}
              </div>

              <div class="product-info">
                Quantity: ${productQuantity}
              </div>

              <img class="product-image" src="${productIMG}">

              <div class="progress-labels-container">
                <div class="progress-label">
                  Preparing
                </div>
                <div class="progress-label current-status">
                  Shipped
                </div>
                <div class="progress-label">
                  Delivered
                </div>
              </div>

              <div class="progress-bar-container">
                <div class="progress-bar"></div>
              </div>
            </div>

          `;

          trackingHTML.innerHTML = html;
        }
      });
    }
  });
}
