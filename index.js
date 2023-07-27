const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');
const auth = require('./services/authenticate');

process.env.SECRET_KEY = ""; // Input your secret key here

const app = express();
app.use(bodyParser.json());


app.post("/login", auth.login)

app.get("/api/customers", auth.authenticate, query.getAllCustomers)

app.get("/api/customers/:id", auth.authenticate, query.getCustomerById)

app.post("/api/customers", auth.authenticate, query.createCustomer)

app.delete("/api/customers/:id", auth.authenticate, query.deleteCustomer)

app.delete("/api/customers", auth.authenticate, query.deleteAllCustomers)

app.put("/api/customers/:id", auth.authenticate, query.updateCustomer)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;