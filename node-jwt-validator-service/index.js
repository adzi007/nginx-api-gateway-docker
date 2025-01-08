const express = require('express');
const bodyParser = require('body-parser');
const { validateJWT } = require('./jwt-validator');

const app = express();
app.use(bodyParser.json());

app.get('/validate', async (req, res) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    console.log("authHeader >>>>>> ", authHeader);
    
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ error: 'Authorization header with Bearer token is required' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
  
    try {
      const decoded = await validateJWT(token);
      res.status(200).json({ valid: true, decoded });
    } catch (error) {
      res.status(401).json({ valid: false, error: error.message });
    }
  });

app.listen(3000, () => console.log('JWT Validator Service running on port 3000'));