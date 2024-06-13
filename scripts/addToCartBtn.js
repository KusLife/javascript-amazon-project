 // Adding the icon Active
 export function addToCartBtn(productId) {
  const addedToCartActive = document.getElementById(`${productId}`);
  const timeoutId = () => setTimeout(addedToCartRemoveActiveFnc, 3000);
  const addedToCartRemoveActiveFnc = () => {
    addedToCartActive.classList.remove('added-to-cart-active');
  };

  const addedToCartActiveFnc = () => {
    addedToCartActive.classList.add('added-to-cart-active');
  };

  const handleCartActivity = () => {
    addedToCartActiveFnc();
    clearTimeout(timeoutId);
    timeoutId();
  };

  handleCartActivity();
}