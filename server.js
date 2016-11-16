const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

app.use('/static', express.static(path.join(__dirname, 'dist/static')))

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port);
