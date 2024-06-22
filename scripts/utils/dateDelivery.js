import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 
// Get a numbres of days and show when the item arive
export function deliveryDateLogic(deliveryDays) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryDays, 'days').format('dddd, MMMM D');
  return deliveryDate;
}