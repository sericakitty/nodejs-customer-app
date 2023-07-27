const db = require('./dbconfig');



const getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customers', (err, result) => {
    if (err)
      console.error('Error executing query', err.stack)
    else
      res.render('customerlist', { customers: result.rows })
  })
}

const getCustomerById = (req, res) => {
  const id = req.params.id;
  const query = {
    text: 'SELECT * FROM customers WHERE id = $1',
    values: [id],
  }
  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    
    if (result.rows.length > 0) {
      return res.json(result.rows);
    }
      
    return res.status(404).end();
    
  })
}

const createCustomer = (req, res) => {
  const createdCustomer = req.body;
  const query = {
    text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)',
    values: [createdCustomer.firstname, createdCustomer.lastname, createdCustomer.email, createdCustomer.phone],
  }
  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }

    return res.status(201).json(createdCustomer)
  })
}

const deleteCustomer = (req, res) => {
  const id = req.params.id;
  const query = {
    text: 'DELETE FROM customers WHERE id = $1',
    values: [id],
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }

    return res.status(204).end();
  })
}

const deleteAllCustomers = (req, res) => {
  
  const query = {
    text: 'DELETE FROM customers'
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }

  }
  )
}

const updateCustomer = (req, res) => {

  const updatedCustomer = req.body;

  const query = {
    text: 'UPDATE customers SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE id = $5',
    values: [updatedCustomer.firstname, updatedCustomer.lastname, updatedCustomer.email, updatedCustomer.phone, req.params.id],
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }

    return res.status(204).json(updatedCustomer);
  }
  )
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  deleteAllCustomers,
  updateCustomer
}