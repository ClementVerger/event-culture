const express = require('express');
const app = express();
const eventRoute = require('./routes/eventRoute');
const lieuRoute = require('./routes/lieuRoute');
const siteRoute = require('./routes/siteRoute');
const programRoute = require('./routes/programRoute');
// ...autres imports...

// PAS de app.use(auth); ici avant les routes publiques !

app.use(eventRoute);
app.use(lieuRoute);
app.use(siteRoute);
app.use(programRoute);

// Si vous avez besoin d'auth pour d'autres routes privées, placez-les APRÈS les routes publiques :
// app.use(auth);
// app.use(privateRoute);

module.exports = app;