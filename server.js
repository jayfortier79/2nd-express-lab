const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fruits = require('./models/fruits');
const jsxViewEngine = require('jsx-view-engine');
const vegtables = require('./models/vegtables');
const vegnew = require('./models/vegnew');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// Index Route
app.get('/fruits', (req, res) => {
  res.render('Index', { fruits });
});

//Show Route
app.get('/fruits/:id', (req, res) => {
  //second param of the render method must be an object
  res.render('Show', {
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    fruit: fruits[req.params.id],
  });
});

app.get('/vegtables', (req, res) => {
  res.render('Indexveg', { vegtables });
});

app.get('/vegtables/:id', (req, res) => {
  res.render('Showveg', {
    vegtable: vegtables[req.params.id],
  });
});

app.get('/vegnew/', (req, res) => {
  res.render('Indexnewveg', { vegnew }
)});

app.get('/vegnew/:id', (req, res) => {
  res.render('Indexnewveg', {
    vegnew: vegnew[req.params.id],
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});