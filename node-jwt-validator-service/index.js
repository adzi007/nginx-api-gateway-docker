const express = require('express');
const bodyParser = require('body-parser');
const { validateJWT } = require('./jwt-validator');
const { findMatchingEndpoint } = require('./utils');

const app = express();
app.use(bodyParser.json());

app.get('/validate', async (req, res) => {


  const originalUri = req.headers['x-original-uri'];
  const originalMethod = req.headers['x-original-method'];

  const matchingEndpoint = findMatchingEndpoint(originalUri, originalMethod);
  
  if (matchingEndpoint) {


    if(matchingEndpoint.roles !== null) {

      // validate token and check authorization

      const authHeader = req.headers.authorization; 

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Authorization header with Bearer token is required' });
      }

      const token = authHeader.split(' ')[1];

      try {

        const decoded = await validateJWT(token);

        // Add roles as a custom header
        const roles = decoded.resource_access?.['customer-service']?.roles?.join(',') || '';
        res.set('X-User-Roles', roles);
    
        res.status(200).json({ valid: true });
    
      } catch (error) {
        res.status(401).json({ valid: false, error: error.message });
      }

    } else {

      // no authentication required
      res.status(200).json({ valid: true });

    }

  } else {

    // console.log("No matching endpoint found.");
    return res.status(404).json({ error: 'Route Not Found' });

  }

});

app.listen(3000, () => console.log('JWT Validator Service running on port 3000'));
