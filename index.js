const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routers/school');

const app = express();

app.use(bodyParser.json());

app.use('/api', schoolRoutes);

const PORT = process.env.CLIENTPORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});