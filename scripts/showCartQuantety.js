import { cart } from './cart.js';

export function showCartQuantety() {
  let quantety = 0;
  cart.forEach((cartItem) => {
    quantety += cartItem.cuantety;
  });
  return quantety;
}
showCartQuantety();
