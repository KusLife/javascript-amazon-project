import { priceToDecmo } from '../scripts/utils/priceConvertor.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 15,
    priceCents: 0,
    name: '- FREE Shipping',
  },
  {
    id: '2',
    deliveryDays: 7,
    priceCents: 499,
    name: '- One Week Shipping',
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
    name: '- Express Delivery',
  },
];

class Products {
  id;
  image;
  name;
  rating;
  priceCents;
  type;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.type = productDetails.type;
    this.keywords = productDetails.keywords;
  }

  getStarsURL() {
    return `images/ratings/rating-${this.rating.stars * 10}.png `;
  }

  getPrice() {
    return `$${priceToDecmo(this.priceCents)}`;
  }

  getMoreInfoHtml() {
    return '';
  }
}

class Clothing extends Products {
  sizeChartLink;

  constructor(clothingDetails) {
    super(clothingDetails);
    this.sizeChartLink = `<a href="../${clothingDetails.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
  getMoreInfoHtml() {
    return this.sizeChartLink;
  }
}

class Appliances extends Products {
  constructor(appliancesInfo) {
    super(appliancesInfo);
  }

  getMoreInfoHtml() {
    return `
     <a href="images/appliance-instructions.png" target="_black">Instructions</a>
     <a href="images/appliance-warranty.png" target="_black">Warranty</a>
    `;
  }
}

export let products = [];

export function getProductsFetch() {
  const productsPromise = fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      return response.json();
    })
    .then((productsFromBack) => {
      products = productsFromBack.map((productDetails) => {
        const keyword = 'appliances';
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        } else if (productDetails.keywords.includes(keyword)) {
          return new Appliances(productDetails);
        } else {
          return new Products(productDetails);
        }
      });
    });
  return productsPromise;
}


/*
export function getProductsBackend(fnc) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      const keyword = 'appliances';
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.keywords.includes(keyword)) {
        return new Appliances(productDetails);
      } else {
        return new Products(productDetails);
      }
    });
    fnc();
    console.log('1 - products loaded!');
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
*/