
export const endpointsConfig = {
    endpoints: [
      {
        path: "/products",
        methods: {
          GET: {
            roles: [], // Empty array means no roles required, open to all authenticated users
          },
          POST: {
            roles: ["admin", "manager"], // Roles allowed to create products
          },
        },
      },
      {
        path: "/products/:id",
        methods: {
          GET: {
            roles: [], // No roles required, open to all authenticated users
          },
          PUT: {
            roles: ["admin", "manager"], // Roles allowed to update product details
          },
          DELETE: {
            roles: ["admin"], // Only admins can delete products
          },
        },
      },
      {
        path: "/category",
        methods: {
          GET: {
            roles: null, // Null or undefined means no authentication required
          },
          POST: {
            roles: ["admin", "manager"], // Roles allowed to create a category
          },
        },
      },
      {
        path: "/category/:id",
        methods: {
          GET: {
            roles: null, // Null or undefined means no authentication required
          },
          PUT: {
            roles: ["admin", "manager"], // Roles allowed to update a category
          },
          DELETE: {
            roles: ["admin"], // Only admins can delete categories
          },
        },
      },
    ],
  };
  