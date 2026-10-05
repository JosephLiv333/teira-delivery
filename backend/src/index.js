const express = require('express');
const cors = require('cors');
require('dotenv').config();

const deliveryRoutes = require('./routes/deliveryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/deliveries', deliveryRoutes);

app.get('/', (req, res) => {
  res.send('API de Gestión de Delivery activa');
});

// Solo escucha en el puerto cuando se ejecuta localmente
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;