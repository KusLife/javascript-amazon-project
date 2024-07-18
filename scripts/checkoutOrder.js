import ordersData from '../data/ordersData.js';

// Save an 'ordersData' to the localSt and remove the 'cart'
export function placeOrder(order) {
  ordersData.unshift(order);
  addOrderStorage();
  deleteCartStorage();
}

// Save an 'OrderObj' in the 'localStorage'
function addOrderStorage() {
  localStorage.setItem('ordersData', JSON.stringify(ordersData));
}

// Delete actual 'cart' in case if we have placed an order
function deleteCartStorage() {
  const cart = 'cart';

  if (localStorage.getItem(cart) !== null && localStorage.getItem(cart)) {
    localStorage.removeItem(cart);

    // localStorage.removeItem('ordersData');
    console.log(`Item with cart has been removed.`);
  } else {
    console.log(`Item with cart does not exist in localStorage.`);
  }
}
