import ordersData from '../data/ordersData.js';
import { products } from '../data/products.js';
import { priceToDecmo } from './utils/priceConvertor.js';

const ordersHTML = document.querySelector('.js-main-orders');

// Add main info about the order
function renderOrderConteiner() {
  let orderConteinerHTML = '';
  ordersData.forEach((orderContainer) => {

    orderConteinerHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderContainer.orderPlaced}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${priceToDecmo(orderContainer.TotalPrice)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderContainer.orderID}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderDeteils(orderContainer.itemsCart)}
          </div>

        </div>
    `;
  });
  return orderConteinerHTML;
}

function orderDeteils(orderItems) {
  let orderDeteilsHTML = '';
  orderItems.forEach((orderItem) => {
    let orderItemImg = '';
    let orderItemName = '';
    let arrivingDate = '';
    let quantety = '';

    products.forEach((product) => {
      if (product.id === orderItem.itemID) {
        orderItemImg = product.image;
        orderItemName = product.name;
      }
    });
    arrivingDate = orderItem.arrivingDate;
    quantety = orderItem.quantety;

    orderDeteilsHTML += `
      <div class="product-image-container">
              <img src="${orderItemImg}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${orderItemName}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingDate}
              </div>
              <div class="product-quantity">
                Quantity: ${quantety}
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
// The grid of the page
const html = `
<div class="page-title">Your Orders</div>

      <div class="orders-grid">
        ${renderOrderConteiner()}
      </div>

`;

// Finely set complite container to html
ordersHTML.innerHTML = html;
