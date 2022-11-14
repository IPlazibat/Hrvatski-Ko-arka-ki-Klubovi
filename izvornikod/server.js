const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home.routes');
const datatableRouter = require('./routes/datatable.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/datatable', datatableRouter);

app.listen(3000);