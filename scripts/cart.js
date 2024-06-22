// check if any item from the list maches the click id and look for cuantity
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      s: '54e0eccd-8f36-462b-b68a-8182611d9add',
      cuantety: 3,
      deliveryOptionId: '1',
    },
    {
      productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
      cuantety: 2,
      deliveryOptionId: '2',
    },
  ];
}

function addToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Filter out any undefined or invalid items in the cart
// const validCartItems = cart.filter((item) => {
//   if (!item || !item.productId) {
//     console.error('Invalid item encountered:', item);
//     localStorage.clear();
//     return false;
//   }
//   return true;
// });

export function addToCart(productId, cuantetyValue) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    // Update the quantity of the matching item
    matchingItem.cuantety += cuantetyValue;
  } else {
    // Add a new item to the cart
    cart.push({
      productId: productId,
      cuantety: cuantetyValue,
      deliveryOptionId: '1',
    });
  }
  addToStorage();
}

// Removing from the cart an obj
export function removeFromCart(productId) {
  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  const newCart = [];
  cart.forEach((product) => {
    if (product.productId !== productId) {
      newCart.push(product);
    } else if (product.productId === productId && product.cuantety > 1) {
      product.cuantety--;
      newCart.push(product);
    } else {
      container.remove();
    }
  });
  cart = newCart;
  addToStorage();
}

// Incrising quantity of a product by one
export function updateProductQuantity(productId) {
  const newCart = [];
  cart.forEach((product) => {
    if (product.productId !== productId) {
      newCart.push(product);
    } else if (product.productId === productId) {
      product.cuantety++;
      newCart.push(product);
    }
  });
  cart = newCart;
  addToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  addToStorage();
}
