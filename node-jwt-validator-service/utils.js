
const { servicesAccess } = require("./access");

/**
 * Find the matching endpoint from the servicesAccess configuration.
 * @param {string} uri - The request URI to match (e.g., "/products/products/23").
 * @param {string} method - The HTTP method (e.g., "GET", "POST").
 * @returns {object|null} - The matching endpoint configuration, or null if no match.
 */

const findMatchingEndpoint = (uri, method) => {
    // Normalize the request URI (remove query params)
    const cleanedUri = uri.split("?")[0];
  
    // Split URI into segments for comparison
    const uriSegments = cleanedUri.split("/").filter(Boolean);
  
    for (const service of servicesAccess) {
      // Check if the URI starts with the basePath of the service
      if (!cleanedUri.startsWith(service.basePath)) continue;
  
      for (const endpoint of service.endpoints) {
        const fullPath = `${service.basePath}${endpoint.path}`;
        const endpointSegments = fullPath.split("/").filter(Boolean);
  
        // If the segment lengths don't match, continue
        if (uriSegments.length !== endpointSegments.length) continue;
  
        // Check each segment
        let isMatch = true;
        for (let i = 0; i < uriSegments.length; i++) {
          if (
            endpointSegments[i] !== uriSegments[i] &&
            !endpointSegments[i].startsWith(":")
          ) {
            isMatch = false;
            break;
          }
        }
  
        // If it matches, validate the HTTP method
        if (isMatch && endpoint.methods[method]) {
          return {
            serviceName: service.serviceName,
            basePath: service.basePath,
            endpoint: endpoint.path,
            method: method,
            roles: endpoint.methods[method].roles,
          };
        }
      }
    }
  
    return null; // No match found
  }
  
  // Example usage
//   const requestUri = "/products/products/23";
//   const requestMethod = "GET";
  
//   const matchingEndpoint = findMatchingEndpoint(requestUri, requestMethod);
  
//   if (matchingEndpoint) {
//     console.log("Matched Endpoint:", matchingEndpoint);
//   } else {
//     console.log("No matching endpoint found.");
//   }

module.exports = { findMatchingEndpoint };
  