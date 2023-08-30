const axios = require("axios");

const WooCommerce = axios.create({
  baseURL: "https://ninjashop.in/wp-json/wc/v3",
  auth: {
    username: "ck_bcc829bb7da7954f7487748a9963e966cef16c71",
    password: "cs_0e50ba69c14687741ff1252295d26eb70368e94d",
  },
});

async function getProducts(page) {
  const fromDate = '2016-01-01T00:00:00Z';
  const toDate = '2022-12-29T23:59:59Z';
  const RecordPerPage = 5;

  try {
    const response = await WooCommerce.get("/products", {
      params: {
        after: fromDate,
        before: toDate,
        per_page: RecordPerPage,
        page: page,
        orderby: 'date',
        order: "asc",
      },
    });

    const products = response.data || [];
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function main() {
  let page = 1;

  while (true) {
    const products = await getProducts(page);

    if (products.length === 0) {
      break;
    }

    console.log(`Page ${page} Products:`, products);
    console.log("Page No:",page)
    console.log("Recorde Per Page",products.length)
    page++;
  }
}

main();
