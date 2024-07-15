import { priceToDecmo } from '../../../scripts/utils/priceConvertor.js';
import { getProductsBackend, products } from '../../../data/products.js';

// new Promise((resolve) => {
//   getProductsBackend(() => {
//     resolve()
//   })
// })

// callbacks
// getProductsBackend(() => {
//   console.log('shuld be loaded ferst');
//   tests()
// });

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

////  promises
// new Promise((resolve) => {
//   getProductsBackend(() => {
//     resolve()
//   })
// }).then(() => {
// tests()
// function tests(params) {
describe('Clothing class', () => {
  it('should create a Clothing instance with a sizeChartLink', () => {
    const clothingDetails = {
      id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      name: 'Adults Plain Cotton T-Shirt - 2 Pack',
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ['tshirts', 'apparel', 'mens'],
      type: 'clothing',
      sizeChartLink: 'images/clothing-size-chart.png',
    };

    const clothing = new Clothing(clothingDetails);

    expect(clothing).toBeInstanceOf(Clothing);
    expect(clothing.sizeChartLink).toBe(
      '<a href="../images/clothing-size-chart.png" target="_blank">Size Chart</a>'
    );
  });

  it('should return the correct HTML for size chart link', () => {
    const clothingDetails = {
      sizeChartLink: 'images/clothing-size-chart.png',
    };
    const clothing = new Clothing(clothingDetails);

    expect(clothing.getMoreInfoHtml()).toBe(
      '<a href="../images/clothing-size-chart.png" target="_blank">Size Chart</a>'
    );
  });
});

describe('Appliances class', () => {
  beforeAll((done) => {
    getProductsBackend(() => {
      done();
      console.log('backend loaded');
    });
  });

  it('should create an Appliances instance', () => {
    const appliancesInfo = {
      id: '54e0eccd-8f36-462b-b68a-8182611d9add',
      image: 'images/products/black-2-slot-toaster.jpg',
      name: '2 Slot Toaster - Black',
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ['toaster', 'kitchen', 'appliances'],
    };

    const appliances = new Appliances(appliancesInfo);

    expect(appliances).toBeInstanceOf(Appliances);
  });

  it('should return the correct HTML for appliance links', () => {
    const appliancesInfo = {};
    const appliances = new Appliances(appliancesInfo);

    expect(appliances.getMoreInfoHtml()).toBe(`
     <a href="images/appliance-instructions.png" target="_black">Instructions</a>
     <a href="images/appliance-warranty.png" target="_black">Warranty</a>
    `);
  });
});

describe('Products data', () => {
  let product;
  new Promise((resolve) => {
    getProductsBackend(() => {
      resolve();
    });
  }).then(() => {
    product = structuredClone(products[0]);
  });

  // let product = structuredClone(products[0]);
  it('should have products with valid properties', () => {
    expect(product.id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toBe(
      'images/products/athletic-cotton-socks-6-pairs.jpg'
    );
    expect(product.name).toBe('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.rating.stars).toBe(4.5);
    expect(product.rating.count).toBe(87);
    expect(product.priceCents).toBe(1090);
    expect(product.keywords).toEqual(['socks', 'sports', 'apparel']);
  });
  console.log('progucts loaded?');
  console.log(products);
  it('should have clothing products with sizeChartLink', () => {
    const clothingProducts = products.filter(
      (product) => product.type === 'clothing'
    );
    clothingProducts.forEach((product) => {
      expect(product).toBeDefined('sizeChartLink');
    });
  });
});
// }
// })
