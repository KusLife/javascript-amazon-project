import { deliveryDateLogic } from './utils/dateDelivery.js';
import ordersData from '../data/ordersData.js';
import { cart } from './cart.js';
import { deliveryOptions } from '../data/products.js';
import { generateUUID } from './utils/generateUUID.js';

// Create an 'arr' with cart products but save it to 'ordersData'
function orderProductsArr() {
  const orderCartItems = [];

  cart.forEach((item) => {
    let date = 0;
    deliveryOptions.forEach((delivery) => {
      if (delivery.id === item.deliveryOptionId) {
        date = deliveryDateLogic(delivery.deliveryDays);
      }
    });

    orderCartItems.push({
      itemID: item.productId,
      arrivingDate: date,
      quantety: item.quantity,
    });
  });
  return orderCartItems;
}

// Save an 'ordersData' to the localSt and remove the 'cart'
export function placeOrder(totalPrice) {
  ordersData.push({
    orderPlaced: deliveryDateLogic(0),
    TotalPrice: totalPrice,
    orderID: generateUUID(),
    itemsCart: orderProductsArr(),
  });

  addOrderStorage();
  deleteCartStorage();
}

// Save an 'OrderObj' in the 'localStorage'
function addOrderStorage() {
  localStorage.setItem('ordersData', JSON.stringify(ordersData));
}

// Delete actual 'cart' in case if we have paced an order
function deleteCartStorage() {
  const cart = 'cart';

  if (localStorage.getItem('cart') !== null && localStorage.getItem('cart')) {
    localStorage.removeItem('cart');

    // localStorage.removeItem('ordersData');
    console.log(`Item with cart '${cart}' has been removed.`);
  } else {
    console.log(`Item with cart '${cart}' does not exist in localStorage.`);
  }
}
