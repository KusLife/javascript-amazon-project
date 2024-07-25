 export const cart = {
  cartItems: undefined,
  // check if any item from the list maches the click id and look for cuantity
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

    if (!this.cartItems) {
      this.cartItems = [];
      // cart = [
      //   {
      //     productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
      //     quantity: 3,
      //     deliveryOptionId: '1',
      //   },
      //   {
      //     productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
      //     quantity: 2,
      //     deliveryOptionId: '2',
      //   },
      // ];

      // alert('No cart items yet')
    }
  },

  addToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  addToCart(productId, quantityValue) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      // Update the quantity of the matching item
      matchingItem.quantity += quantityValue;
    } else {
      // Add a new item to the cart
      this.cartItems.push({
        productId: productId,
        quantity: quantityValue,
        deliveryOptionId: '1',
      });
    }
    this.addToStorage();
  },

  // Removing from the cart an obj
  removeFromCart(productId) {
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const newCart = [];
    this.cartItems.forEach((product) => {
      if (product.productId !== productId) {
        newCart.push(product);
      } else if (product.productId === productId && product.quantity > 1) {
        product.quantity--;
        newCart.push(product);
      } else {
        container.remove();
      }
    });
    this.cartItems = newCart;
    this.addToStorage();
  },

  // Incrising quantity of a product by one
  updateProductQuantity(productId) {
    const newCart = [];
    this.cartItems.forEach((product) => {
      if (product.productId !== productId) {
        newCart.push(product);
      } else if (product.productId === productId) {
        product.quantity++;
        newCart.push(product);
      }
    });
    this.cartItems = newCart;
    this.addToStorage();
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.addToStorage();
  },
};

cart.loadFromStorage();
