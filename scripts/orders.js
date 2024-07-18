import ordersData from '../data/ordersData.js';
import { getProductsFetch, products } from '../data/products.js';
import { showCartQuantety } from './updateCartQuantity.js';
import { deliveryDateForamt, deliveryDateLogic } from './utils/dateDelivery.js';
import { priceToDecmo } from './utils/priceConvertor.js';

getProductsFetch().then(() => {
  loadOrders();
});

function loadOrders() {
  const ordersHTML = document.querySelector('.js-main-orders');
  // Add main info about the order
  function renderOrderConteiner() {
    let orderConteinerHTML = '';
    ordersData.forEach((orderInfo) => {
      orderConteinerHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${deliveryDateForamt(orderInfo.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${priceToDecmo(orderInfo.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderInfo.id}</div>
            </div>
          </div>

          <div class="order-details-grid"/>
           ${orderDeteils(orderInfo.products)}
          </div>
          
          </div>
          `;
    });
    return orderConteinerHTML;
  }

  function orderDeteils(orderProducts) {
    let orderDeteilsHTML = '';
    orderProducts.forEach((orderItem) => {
      console.log(orderItem);
      // debugger
      let orderItemImg = '';
      let orderItemName = '';
      let arrivingDate = '';
      let quantity = '';

      products.forEach((product) => {
        if (product.id === orderItem.productId) {
          orderItemImg = product.image;
          orderItemName = product.name;
        }
      });
      arrivingDate = orderItem.estimatedDeliveryTime;
      quantity = orderItem.quantity;
      orderDeteilsHTML += `
      <div class="product-image-container">
              <img src="${orderItemImg}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${orderItemName}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDateForamt(arrivingDate)}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
    });

    return orderDeteilsHTML;
  }

  // Show number of orders
  function numbersOfOrders() {
    let orderQuantity;
    orderQuantity = ordersData.length;
    return orderQuantity;
  }

  // The grid of the page
  const html = `
<div class="page-title">Your Orders: ${numbersOfOrders()} </div>
      <div class="orders-grid">
        ${renderOrderConteiner()}
      </div>
`;

  // Finely set complite container to html
  ordersHTML.innerHTML = html;
  // Show cart quantity
  function showOrderCartQuantety() {
    document.querySelector('.js-orders-cart-quantity').innerHTML =
      showCartQuantety();
  }
  showOrderCartQuantety();
}
