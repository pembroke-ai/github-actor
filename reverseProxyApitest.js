const axios = require('axios');

axios.get('http://localhost:3000/api/test')
  .then(response => {
    console.log('Test passed:', response.status === 200);
  })
  .catch(error => {
    console.log('Test failed:', error);
  });
