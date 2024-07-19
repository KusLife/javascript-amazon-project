import { cart } from './cart.js';

// add one item
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function showCartQuantety() {
  let quantity = 0;
  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });
  return quantity;
}
showCartQuantety();
