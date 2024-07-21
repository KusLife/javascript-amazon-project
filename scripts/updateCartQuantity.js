import { cart } from './cart.js';
// add one item
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  }); 
}

export function showCartQuantety() {
  const cartQuantity = cart.length
  return cartQuantity;
}
showCartQuantety();

export function allItemsQuantity() {
    let itemsQuantity = 0;
     cart.forEach((cartItem) => {
      itemsQuantity += cartItem.quantity;
    });
    return itemsQuantity
  }
