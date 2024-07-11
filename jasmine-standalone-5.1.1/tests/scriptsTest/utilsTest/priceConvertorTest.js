import { priceToDecmo } from '../../../scripts/utils/priceConvertor.js';

describe('TEST SUIT: CALCULATE PRICE TO DECMO', () => {
  it('tets 2095 to 20.95', () => {
    expect(priceToDecmo(2095)).toEqual('20.95')
  });


  it('tets 2000.5 to 20.01', () => {
    expect(priceToDecmo(2000.5)).toEqual('20.01')
  })

  it('tets 0 to 0.00', () => {
    expect(priceToDecmo(0)).toEqual('0.00')
  })
});
