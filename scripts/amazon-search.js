// search items by the 'name' and hide all not matched 
function searchAmazonProducts(searchBar, productsBoxName) {
  searchBar.addEventListener('input', () => {
    const searchQuery = searchBar.value.toLowerCase();

    Array.from(productsBoxName).forEach((boxItem) => {
      const productName = boxItem.textContent.toLowerCase();
      const choosenProduct = boxItem.parentElement;

      if (productName.includes(searchQuery)) {
        choosenProduct.classList.remove('hiden');
      } else {
        choosenProduct.classList.add('hiden');
      }
    });
  });
}

export default searchAmazonProducts;
