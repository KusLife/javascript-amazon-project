 // Adding the icon Active

// import { orderSummary } from "./checkout.js";

 export function addToCartBtn(productId) {
  const addedToCartActive = document.getElementById(`${productId}`);
  const timeoutId = () => setTimeout(addedToCartRemoveActiveFnc, 3000);
  const addedToCartRemoveActiveFnc = () => {
    // console.log('Removing added-to-cart-active class');
    addedToCartActive.classList.remove('added-to-cart-active');
  };

  const addedToCartActiveFnc = () => {
    // console.log('Adding added-to-cart-active class');
    addedToCartActive.classList.add('added-to-cart-active');
  };

  const handleCartActivity = () => {
    addedToCartActiveFnc();
    clearTimeout(timeoutId);
    timeoutId();
    // orderSummary()
  };

  handleCartActivity();
}