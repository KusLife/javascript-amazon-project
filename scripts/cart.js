export let cart;

loadFromStorage();

// check if any item from the list maches the click id and look for cuantity
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [];
  }
}

function addToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantityValue) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    // Update the quantity of the matching item
    matchingItem.quantity += quantityValue;
  } else {
    // Add a new item to the cart
    cart.push({
      productId: productId,
      quantity: quantityValue,
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
    } else if (product.productId === productId && product.quantity > 1) {
      product.quantity--;
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
      product.quantity++;
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

// log response text from cart fetching
export function loadCartFetch() {
  const cartPromis = fetch('https://supersimplebackend.dev/cart')
  .then(
    (response) => {response.text()
      .then((text) => {
        return console.log(text);
      });
    }
  );
  return cartPromis;
}
