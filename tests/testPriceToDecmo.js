import { priceToDecmo } from "../scripts/utils/priceConvertor.js";



console.log('TEST SUIT: CALCULATE PRICE TO DECMO');
console.log('tets 2095 to 20.95');
// Basic test case
if (priceToDecmo(2095) === '20.95') {
  console.log('past');
} else { 
  console.log('failed');
}

// Edge test cases
console.log('tets 2000.5 to 20.01');

if (priceToDecmo(2000.5) === '20.01') {
  console.log('past');
} else { 
  console.log('failed');
}
console.log('tets 0 to 0.00');
if (priceToDecmo(0) === '0.00') {
  console.log('past');
} else { 
  console.log('failed');
}