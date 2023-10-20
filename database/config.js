
// Conexión a Base de datos
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    var uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}/${process.env.DB_NAME}`;

    if (process.env.ENVIRONMENT == 'development') {
      uri = `mongodb://${process.env.HOST_DB}/${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
    }

    mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => console.log(`Conectado con la base de datos "${process.env.DB_NAME}"`))
    // .catch(e => console.log('error db:', e));
    console.log(`Conectado con la base de datos "${process.env.DB_NAME}"`);
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar a la base de datos')
  }
}

module.exports = { dbConnection };
