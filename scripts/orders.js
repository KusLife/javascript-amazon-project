import ordersData from '../data/ordersData.js';
import { getProductsFetch, products } from '../data/products.js';
import { addToCart } from './cart.js';
import { addToCartBtn } from './cartBtns.js';
import { showCartQuantety } from './updateCartQuantity.js';
import {
  deliveryDateForamt,
  orderStatusDateCheck,
} from './utils/dateDelivery.js';
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

          <div class="order-details-grid">
           ${orderDeteils(orderInfo.products, orderInfo.id)}
          </div>
          
        </div>
          `;
    });
    return orderConteinerHTML;
  }

  function orderDeteils(orderProducts, orderId) {
    let orderDeteilsHTML = '';
    orderProducts.forEach((orderItem) => {
      // console.log(orderItem);
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
      
      
       <div class="product-container">
            <div class="product-image-container">
              <img src="${orderItemImg}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${orderItemName}
              </div>
              <div class="product-delivery-date">
                Arriving on: <span class="product-delivery-status">${deliveryDateForamt(
                  arrivingDate
                )}</span>
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <div class="added-to-cart" id="${orderItem.productId}">
                <img src="images/icons/checkmark.png" />
                Added
              </div>
              
              <button class="buy-again-button button-primary js-buy-again-button"
              data-product-id="${orderItem.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
              
            </div>

            <div class="product-actions">

              <a href="tracking.html?orderId=${orderId}&productId=${
                  orderItem.productId
               }">

                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
              
              </div>
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

  // Add to cart an item from 'orders'
  const buyAgainBtn = document.querySelectorAll('.js-buy-again-button');
  buyAgainBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.productId, 1);
      addToCartBtn(btn.dataset.productId);
      showOrderCartQuantety();
    });
  });

  // Get prouct date and check it if delivered add color
  const productsStates = document.querySelectorAll('.product-delivery-status');
  productsStates.forEach((state) => {
    const statusClass = orderStatusDateCheck(state.innerText);
    state.classList.add(statusClass);
  });

  function filterProducts(name, isChecked) {}
  // Filtering produts by the date if delivered or in progres
  const filterProductsStates = productsStates;
  filterProductsStates.forEach((filterStates) => {
    const parent = filterStates.parentElement.parentElement.parentElement;
    const isInclude = filterStates.className.includes('progres');
    let isChecked = true;
    // let isChecked = isChecked
    console.log(isChecked);
    console.log(parent);

    if (isInclude && isChecked) {
      parent.classList.remove('hiden');
      console.log('remove hiden');
    } else {
      parent.classList.add('hiden');
      console.log('added hiden');
    }
  });
  // Check what isChecked and pass it father to invico 'filter'
  const ordersStatusCheckbox = document.querySelectorAll('.filter-checkbox');
  ordersStatusCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      const name = checkbox.names;

      // filterProducts(name, checkbox.checked)
      // console.log(checkbox.checked);
      // console.log(checkbox.className);
    });
  });
}

/* 
css when srinck to mobile size text removes
and stay icons

class .hiden{
display: hiden;
}

logic for marck up orders states in colors as the icons 
with shadow and header background

fnc that check atual date and compare it to the order's

'if' will check if there is any order in choosen category
if yes then hide all others 
if no such then will be 'disabeld'

*/
