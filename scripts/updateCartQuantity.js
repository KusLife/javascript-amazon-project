import { cart } from './cart.js';

export function updateCartQuantity() {
  let cartCuantety = 0;
  cart.forEach((cartItem) => {
    cartCuantety += cartItem.cuantety;
  });
  document.querySelector('.js-cart-cuantety').innerHTML = cartCuantety;
}
