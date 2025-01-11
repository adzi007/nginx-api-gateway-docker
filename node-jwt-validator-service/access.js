
const productServiceEnpoints = {
    serviceName: "products",
    basePath: "/products",
    endpoints: [
      {
        path: "/products",
        methods: {
          GET: { roles: null },
          POST: { roles: ["admin"] },
        },
      },
      {
        path: "/products/:id",
        methods: {
          GET: { roles: null },
          PUT: { roles: ["admin"] },
          DELETE: { roles: ["admin"] },
        },
      },
      {
        path: "/category",
        methods: {
          GET: { roles: null },
          POST: { roles: ["admin"] },
        },
      },
      {
        path: "/category/:id",
        methods: {
          GET: { roles: null },
          PUT: { roles: ["admin"] },
          DELETE: { roles: ["admin"] },
        },
      },
    ],
};

const cartServiceEndpoints = {
  serviceName: "cart",
  basePath: "/cart",
  endpoints: [
    {
      path: "/",
      methods: {
        GET: { roles: ['end_user_customer'] },
        POST: { roles: ["end_user_customer"] },
        PUT: { roles: ["end_user_customer" ] },
        DELETE: { roles: ["end_user_customer"] },
      },
    },
  ],
}

const servicesAccess = [ 
  productServiceEnpoints,
  cartServiceEndpoints
]

module.exports = { servicesAccess };
  