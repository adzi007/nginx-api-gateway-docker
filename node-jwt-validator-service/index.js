const express = require('express');
const bodyParser = require('body-parser');
const { validateJWT } = require('./jwt-validator');

const app = express();
app.use(bodyParser.json());

app.get('/validate', async (req, res) => {


  const originalUri = req.headers['x-original-uri'];
  const originalMethod = req.headers['x-original-method'];

  console.log('X-Original-URI:', originalUri);
  console.log('X-Original-Method:', originalMethod);



  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
    
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Authorization header with Bearer token is required' });
  }
  const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
  try {

    const decoded = await validateJWT(token);

    // console.log("decoded >>> ", decoded);
    

    // Add roles as a custom header
    const roles = decoded.resource_access?.['customer-service']?.roles?.join(',') || '';
    // const roles = 'admin, admin_user';

    res.set('X-User-Roles', roles);

    res.status(200).json({ valid: true });

  } catch (error) {

    res.status(401).json({ valid: false, error: error.message });

  }
});

app.listen(3000, () => console.log('JWT Validator Service running on port 3000'));
