const sql = require('mssql/msnodesqlv8')
const mongoose = require('mongoose');

const config = {
  driver: 'msnodesqlv8',
    server: 'DESKTOP-8IJ4ERP', 
    database: 'EmployeeDB',
  options: {
    trustedConnection: true
  }
} 

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}

