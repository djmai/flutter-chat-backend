
// Conexión a Base de datos
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}/${process.env.DB_NAME}`;
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
