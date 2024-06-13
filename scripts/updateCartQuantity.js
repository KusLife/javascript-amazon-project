import { cart } from './cart.js';

export function updateCartQuantity() {
  let cartCuantety = 0;
  cart.forEach((cartItem) => {
    cartCuantety += cartItem.cuantety;
  });
  document.querySelector('.js-cart-cuantety').innerHTML = cartCuantety;
}
export function showCartQuantety() {
  let quantety = 0;
  cart.forEach((cartItem) => {
    quantety += cartItem.cuantety;
  });
  return quantety;
}
showCartQuantety();
