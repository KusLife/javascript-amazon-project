// check if any item from the list maches the click id and look for cuantity
export let cart = [
  { productId: '54e0eccd-8f36-462b-b68a-8182611d9add', cuantety: 3 },
  { productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d', cuantety: 2 },
];

export function addToCart(productId, cuantetyValue) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.cuantety += cuantetyValue;
  } else {
    cart.push({
      productId: productId,
      cuantety: cuantetyValue,
    });
  }

  // console.log(cart);
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((product) => {
    if (product.productId !== productId) {
      newCart.push(product);
    }
    // const container = document.querySelector(
    //   `.js-cart-item-container-${product.productId}`
    // );

    // container.remove()
  });

  cart = newCart;

  // console.log(cart)
}
