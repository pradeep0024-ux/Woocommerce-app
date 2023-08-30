const axios = require('axios');

const WooCommerce = axios.create({
  baseURL: 'https://ninjashop.in/wp-json/wc/v3',
  auth: {
    username: 'ck_bcc829bb7da7954f7487748a9963e966cef16c71',
    password: 'cs_0e50ba69c14687741ff1252295d26eb70368e94d',
  },
});

async function getOrders(page) {
  const fromDate = '2016-06-06T00:00:00';
  const toDate = '2022-12-29T23:59:59';
  const RecordPerPage = 5;

  try {
    const response = await WooCommerce.get('/orders', {
      params: {
        after: fromDate,
        before: toDate,
        per_page: RecordPerPage,
        page: page,
        orderby: 'date',
        order: 'asc',
      },
    });

    const orders = response.data || [];
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

async function main() {
  let page = 1;

  while (true) {
    const orders = await getOrders(page);

    if (orders.length === 0) {
      break;
    }

    console.log(`Page ${page} Orders:`, orders);
    console.log("Page No:",page)
    console.log("Recorde Per Page",products.length)
    page++;
  }
}
main();
