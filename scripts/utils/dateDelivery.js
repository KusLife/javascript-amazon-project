// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.12/+esm'
 


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
  // const deliveryDate = today.add(deliveryDays, 'days').format('MM/DD/YYYY');
  return deliveryDate;
}

// Just return the date from the in  apropied format look
export function deliveryDateForamt(delivery) {
  const date = dayjs(delivery);
  const deliveryDate = date.format('dddd, MM/DD/YYYY');
  // const deliveryDate = date.format('dddd, MMMM D');
  // console.log(dayjs().format('DD/MM/YYYY'));
  return deliveryDate;
}


export function orderStatusDateCheck(estimatedDeliveryTime, ishue) {
  // const today = dayjs()
  // const orderDate = '7/12/2024'
  // const orderDate = estimatedDeliveryTime

  // const todayDate = dayjs(today ,'DD/MM/YYYY')
  // const todayDate = dayjs(today ,'MM/DD/YYYY')
  const deliveryDate = dayjs(estimatedDeliveryTime ,'MM/DD/YYYY')
  const isAfterDate = dayjs().isAfter(deliveryDate)
  let isIshued = false
  let orderState = ''

  // console.log(todayDate, 'should be delivered at ', deliveryDate);
  // console.log(isAfterDate);
  // console.log(deliveryDate);

  if (isAfterDate && !isIshued) {
    // console.log('delivered');
    orderState = 'delivered'
  } else if (isIshued) {
    orderState = 'ishued'
    // console.log('order ishued');
  } else {
    orderState = 'progres'
    // console.log('in progres');
  }

  return orderState
}
// as well may be used format('DD/MM/YYYY')
// console.log(orderStatusDateCheck('7/22/2024'))

 


