import {
  cart,
  addToCart,
} from '../../../scripts/cart.js';

// The localStorage should be empty
describe('test suit: CART ADD ITEMS', () => {
  it('adds an existing item to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
          cuantety: 1,
          deliveryOptionId: '1',
        },
      ]);
    });
  });

  it('adds a new item to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart[0].deliveryOptionId).toEqual('1');
  });
});
