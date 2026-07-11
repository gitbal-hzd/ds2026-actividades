const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Backend de la Librería UTN funcionando con Docker! 🐳');
});

app.listen(PORT, () => {
  console.log(`🚀 API escuchando en el puerto ${PORT}`);
});
