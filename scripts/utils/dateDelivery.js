import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const extr = () => {
  let n = 5;
  console.log(n);
  let n2 = 0;

  function showN(num) {
    console.log(num);
    num += 2;
    console.log(num);
    n2 = n + 2;
    console.log(n);
    n += 1;
  }
  showN(n);
  console.log(n);

  (() => {
    console.log(n2);
  })();
};
// extr()

// Get a numbres of days and show when the item arive
// and check if it is not a weakend day
export function deliveryDateLogic(deliveryDays) {
  const today = dayjs();
  const isTheWeekend = today
    .add(deliveryDays, 'days')
    .format('dddd')
    .toLowerCase();

  if (isTheWeekend === 'saturday') {
    deliveryDays += 2;
  } else if (isTheWeekend === 'sunday') {
    deliveryDays += 1;
  }

  const deliveryDate = today.add(deliveryDays, 'days').format('dddd, MMMM D');
  return deliveryDate;
}

// Just return the date from the in  apropied format look
export function deliveryDateForamt(delivery) {
  const date = dayjs(delivery);
  const deliveryDate = date.format('dddd, MMMM D');
  return deliveryDate;
}

// as well may be used format('DD/MM/YYYY')
