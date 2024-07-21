import { cart, removeFromCart, updateProductQuantity } from './cart.js';
import { cartItemsPriceCaunter } from './checkoutSummary.js';

// Rerender quantity in html
export function rerenderItemQuantityHTML(productID) {
  const itemQuantityParent = document.querySelector(
    `.js-cart-item-container-${productID}`
  );
  // Prevent an error in console if null
  if (!itemQuantityParent) {
    return 
  }  
  const newQuantity = itemQuantityParent.querySelector('.js-quantity-label');
  cart.forEach((product) => {
    if (product.productId === productID) {
      newQuantity.innerText = product.quantity;
    }
  });
}

// Rerender and update product quantety in the cart
// Reatach Listeners cuz they slideoff each rerender of html
export function updateQuantityAddEvList() {
  // Handeling updating some objcts or quantety
  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productID = link.dataset.productId;
      updateProductQuantity(productID);
      cartItemsPriceCaunter();
      rerenderItemQuantityHTML(productID);
    });
  });
  // Handeling removing some objcts or quantety
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productID = link.dataset.productId;
      removeFromCart(productID);
      cartItemsPriceCaunter();
      checkOutQuantety();
      rerenderItemQuantityHTML(productID);
    });
  });
}
// An obj and the fnc to add to acutual 'cartQuantety'
function checkOutQuantety() {
  const checkOutQuantetyHTML =
    cart.length > 1
      ? cart.length + ' ' + 'products'
      : cart.length + ' ' + 'product';
  const cartQuantety = document.querySelector('.js-return-to-home-link');
  cartQuantety.innerHTML = checkOutQuantetyHTML;
}
checkOutQuantety();
