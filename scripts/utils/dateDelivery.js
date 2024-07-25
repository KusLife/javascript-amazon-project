import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.12/+esm';

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

// Func remove weekends in a different way
export function deliveryIsWeekend(stringDate) {
  let date = dayjs(stringDate);
  const day = date.day();

  if (day === 0) {
    date = date.add(1, 'day');
  } else if (day === 6) {
    date = date.add(2, 'day');
  }

  return date.format('dddd, MM/DD/YYYY');
}

// Just return the date from the in  apropied format look
export function deliveryDateForamt(delivery) {
  const date = dayjs(delivery);
  const deliveryDate = date.format('dddd, MM/DD/YYYY');
  return deliveryDate;
}

export function orderStatusDateCheck(estimatedDeliveryTime, ishue) {
  const deliveryDate = dayjs(estimatedDeliveryTime, 'MM/DD/YYYY');
  const isAfterDate = dayjs().isAfter(deliveryDate);
  const isIshued = false;
  let orderState = '';

  if (isAfterDate && !isIshued) {
    orderState = 'delivered';
  } else if (isIshued) {
    orderState = 'ishued';
  } else {
    orderState = 'in-progres';
  }

  return orderState;
}
// as well may be used format('DD/MM/YYYY')
// Function to calculate the percentage of delivery time
export function calculateDeliveryProgress(startDate, estimatedDeliveryDate) {
  const start = dayjs(startDate);
  const estimatedDelivery = dayjs(estimatedDeliveryDate);
  const today = dayjs();
  const totalDeliveryTime = estimatedDelivery.diff(start, 'day');
  const elapsedDeliveryTime = today.diff(start, 'day');
  const percentage = (elapsedDeliveryTime / totalDeliveryTime) * 100 ? 
  (elapsedDeliveryTime / totalDeliveryTime) * 100 : 10.00 
  return Math.min(Math.max(percentage, 0), 100).toFixed(2);
}