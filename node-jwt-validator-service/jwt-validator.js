const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

// console.log("url keycloak cert >>>>>>>>>>>>>> ", `${process.env.KEYCLOAK_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`);


const client = jwksRsa({
  jwksUri: `http://${process.env.KEYCLOAK_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 3600000, // 1 hour
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

const validateJWT = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ['RS256'],
        issuer: `http://${process.env.KEYCLOAK_URL}/realms/${process.env.REALM}`,
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      }
    );
  });

module.exports = { validateJWT };
