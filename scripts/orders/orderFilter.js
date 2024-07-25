import { orderStatusDateCheck } from "../utils/dateDelivery.js";

// Filer, show or hide shoosen products 
const productsStates = document.querySelectorAll('.product-delivery-status');
const ordersStatusCheckbox = document.querySelectorAll('.filter-checkbox');

// Get prouct date and check it if delivered add color
productsStates.forEach((state) => {
  const statusClass = orderStatusDateCheck(state.innerText);
  state.classList.add(statusClass);
  state.dataset.status = statusClass;
});
// By togoling live only needed products
ordersStatusCheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const selectedStatuses = Array.from(ordersStatusCheckbox)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    productsStates.forEach((product) => {
      const productContainer =
        product.parentElement.parentElement.parentElement;
      if (selectedStatuses.length === 0) {
        productContainer.style.display = 'grid';
      } else {
        if (selectedStatuses.includes(product.dataset.status)) {
          productContainer.style.display = 'grid';
        } else {
          productContainer.style.display = 'none';
        }
      }
    });
  });
});

/*
// May be used for addional customisation
document.querySelectorAll('.custom-checkbox input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', (event) => {
    console.log(`${event.target.name} is now ${event.target.checked ? 'checked' : 'unchecked'}`);
  });
});
*/
