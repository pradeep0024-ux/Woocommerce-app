const axios = require('axios');

const accessToken = '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';
const shopName = 'hello24-d5';
const apiVersion = '2022-04';

async function fetchOrders(startDate, endDate, pageCursor = null) {
  const query = `
    query {
      orders(first: 5, query: "created_at:${startDate}..${endDate}", after: ${pageCursor ? `"${pageCursor}"` : "null"}) {
        edges {
          node {
            id
            name
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  
  const response = await axios({
    method: 'POST',
    url: `https://${shopName}.myshopify.com/admin/api/${apiVersion}/graphql.json`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    data: JSON.stringify({ query }),
  });
  console.log("response", response.data.data)
  const orders = response.data.data.orders.edges;
  const hasNextPage = response.data.data.orders.pageInfo.hasNextPage;
  const endCursor = response.data.data.orders.pageInfo.endCursor;

  console.log("Orders:");
  orders.forEach(order => {
    console.log(`Order ID: ${order.node.id}, Order Name: ${order.node.name}, Created At: ${order.node.createdAt}`);
  });

  if (hasNextPage) {
    await fetchOrders(startDate, endDate, endCursor);
  }
}

async function fetchProducts() {
  const query = `
    query {
      products(first: 5, sortKey: TITLE) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
  
  const response = await axios({
    method: 'POST',
    url: `https://${shopName}.myshopify.com/admin/api/${apiVersion}/graphql.json`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    data: JSON.stringify({ query }),
  });

  const products = response.data.data.products.edges;

  console.log("Products:");
  products.forEach(product => {
    console.log(`Product ID: ${product.node.id}, Product Title: ${product.node.title}`);
  });
}

const startDate = '2022-01-01T00:00:00Z';
const endDate = '2022-12-29T23:59:59Z';

fetchOrders(startDate, endDate)
  .then(() => {
    fetchProducts();
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
