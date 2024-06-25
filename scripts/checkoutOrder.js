import { deliveryDateLogic } from './utils/dateDelivery.js';
import ordersData from '../data/ordersData.js';
import { cart } from './cart.js';
import { deliveryOptions } from '../data/products.js';
import { generateUUID } from './generateUUID.js';
/*
 */
// let ordersData = JSON.stringify(localStorage('ordersData'))

// document.querySelector('.js-place-order-button')
//.addEventListener('click', () => {
//   console.log('order')
// })

/*
  The fnc that save the CART to storage as orderData and
  show prepared one in case of no.
*/

// First part is about the actual date with a year
// and order price as well an ID

// A fnc looking for a cart item data

function orderProductsArr() {
  const orderCartItems = [];

  cart.forEach((item) => {
    let date = 0;
    deliveryOptions.forEach((delivery) => {
      if (delivery.id === item.deliveryOptionId) {
        date = deliveryDateLogic(delivery.deliveryDays);
      }
    });
    // console.log(orderCartItems);
    
    orderCartItems.push({
      itemID: item.productId,
      arrivingDate: date,
      quantety: item.cuantety,
    });
  });
  console.log(orderCartItems)
  return orderCartItems;
}

// Save an 'ordersData' to the localSt and remove the 'cart'
export function placeOrder(totalPrice) {
  console.log(ordersData)
  ordersData.push({
    orderPlaced: deliveryDateLogic(0),
    TotalPrice: totalPrice,
    orderID: generateUUID(),
    itemsCart: orderProductsArr(),
  });

  addOrderStorage();
  deleteCartStorage()
}

// Save an 'OrderObj' in the 'localStorage'
function addOrderStorage() {
  localStorage.setItem('ordersData', JSON.stringify(ordersData));
}

// Delete actual 'cart' in case if we have paced an order
function deleteCartStorage() {
  const cart = 'myObjectKey';

  if (
    localStorage.getItem('cart') !== null &&
    localStorage.getItem('cart')
  ) {
    localStorage.removeItem('cart');
    // localStorage.removeItem('ordersData');
    console.log(`Item with cart '${cart}' has been removed.`);
  } else {
    console.log(`Item with cart '${cart}' does not exist in localStorage.`);
  }
}
