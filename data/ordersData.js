let ordersData = JSON.parse(localStorage.getItem('ordersData'));
// console.log(ordersData)

if (!ordersData) {
  ordersData = [
    {
      orderPlaced: 'August 12',
      TotalPrice: 3506,
      orderID: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
      itemsCart: [
        {
          itemID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          arrivingDate: 'August 16',
          quantety: 1,
        },
        {
          itemID: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
          arrivingDate: 'August 20',
          quantety: 2,
        },
      ],
    },
    {
      orderPlaced: 'June 10',
      TotalPrice: 4190,
      orderID: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
      itemsCart: [
        {
          itemID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          arrivingDate: 'June 18',
          quantety: 2,
        },
      ],
    },
  ];
}

// console.log(ordersData)

export default ordersData;
