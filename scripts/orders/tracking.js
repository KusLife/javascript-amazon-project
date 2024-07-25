import ordersData from '../../data/ordersData.js';
import { getProductsFetch, products } from '../../data/products.js';
import { showCartQuantety } from '../cart/updateCartQuantity.js';
import { calculateDeliveryProgress, deliveryDateForamt } from '../utils/dateDelivery.js';

getProductsFetch().then(() => {
  trackingContainer();
});

const trackingHTML = document.querySelector('.js-main');
const trackingCartQuantityHTML = (document.querySelector(
  '.js-track-cart-quantity'
).innerText = showCartQuantety());

export function trackingContainer() {
  const url = new URL(window.location.href);
  const orderIdURL = url.searchParams.get('orderId');
  const productIdURL = url.searchParams.get('productId');
  
  let productDeliveryTime = '';
  let productQuantity = 0;
  let productName = '';
  let productIMG = '';
  let startDate = ''
  let estimatedDeliveryDate = ''

  ordersData.forEach((order) => {
    if (orderIdURL === order.id) {
      startDate = order.orderTime
      order.products.forEach((orderItem) => {
        productDeliveryTime = deliveryDateForamt(
          orderItem.estimatedDeliveryTime
        );
        estimatedDeliveryDate = orderItem.estimatedDeliveryTime
        if (orderItem.productId === productIdURL) {
          productQuantity = orderItem.quantity;
          products.forEach((product) => {
            if (product.id === productIdURL) {
              productName = product.name;
              productIMG = product.image;
            }
          });
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
                <div class="progress-bar" style='width:${calculateDeliveryProgress(startDate, estimatedDeliveryDate)}%;'></div>
              </div>
            </div>

          `;

          trackingHTML.innerHTML = html;
        }
      });
    }
  });
 
}
