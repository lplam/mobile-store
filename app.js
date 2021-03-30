const express = require('express');
require('dotenv')
const bodyParser = require('body-parser')
require('./connections/mongodb');
const app = express();
const routes = require('./routes')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

app.use('/',routes);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
