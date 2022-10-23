const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})