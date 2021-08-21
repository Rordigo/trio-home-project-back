const express = require('express');
const routes = require('./api/routes/routes')

port = process.env.PORT || 3000;
app = express();

routes(app);

app.listen(port);

console.log(`Server listening on port ${port}`)
