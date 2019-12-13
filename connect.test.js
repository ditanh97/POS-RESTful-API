const connection = require('./src/Configs/connect')
//above syntac is preferable in jest than using import

test('should output connecting to db  ', ()=> {
    const output =  connection.query ('SELECT * FROM products', (err, response) => {
        if (!err) {
          return response;
        } else {
          return err;
        }
      })
})