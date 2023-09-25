require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const Vegtable = require('./models/vegtables');
const mongoose = require('mongoose');
//include the method-override package in order to be able to DELETE
const methodOverride = require('method-override');

//// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
//////////////////////////

const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

app.use(express.static('public'));




// Middleware;
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }));

//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };

// Index
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    console.log(foundFruits);
    res.status(200).render('index', {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/vegtables', async (req, res) => {
  try {
    const foundVegtable = await Vegtable.find({});
    console.log(foundVegtable);
    res.status(200).render('indexveg', {
      vegtables: foundVegtable,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});






// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('new');
});

app.get('/vegtables/new', (req, res) => {
  console.log('New controller');
  res.render('newveg');
});



// Delete
app.delete('/fruits/:id', async (req, res) => {
  // this is is going to actually implement the delete functionality from the database
  try {
    // we are getting this id from the req params (:id)
    await Fruit.findByIdAndDelete(req.params.id); 
    res.status(200).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }

  // we had this in originally to test that the route worked.  
  // res.send('deleting...');
})


app.delete('/vegtables/:id', async (req, res) => {
  try {
    await Vegtable.findByIdAndDelete(req.params.id); 
    res.status(200).redirect('/vegtables');
  } catch (err) {
    res.status(400).send(err);
  }
})


// Update

// Create
app.post('/fruits', async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdFruit = await Fruit.create(req.body);

    res.status(201).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post('/vegtables', async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdVegtable = await Vegtable.create(req.body);

    res.status(201).redirect('/vegtables');
  } catch (err) {
    res.status(400).send(err);
  }
});



// Edit

// Show
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);

    //second param of the render method must be an object
    res.render('Show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/vegtables/:id', async (req, res) => {
  try {
    const foundVegtable = await Vegtable.findById(req.params.id);
    res.render('Showveg', {
      vegtable: foundVegtable,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});



app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

























/*

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruits = require('./models/fruits');
const jsxViewEngine = require('jsx-view-engine');
const vegtables = require('./models/vegtables');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

app.use(express.static('public'));

// Index Route
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruits.find({});
    console.log(foundFruits);
    res.status(200).render('models/fruits', {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// create
app.post('/fruits', async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdFruit = await Fruits.create(req.body);

    res.status(201).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show Route
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruits.findById(req.params.id);

    //second param of the render method must be an object
    res.render('fruits/Show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/vegtables', (req, res) => {
  res.render('vegtables', { vegtables });
});

app.get('/vegtables/:id', (req, res) => {
  res.render('Showveg', {
    vegtable: vegtables[req.params.id],
  });
});

app.get('/vegnew/', (req, res) => {
  res.render('Indexvegnew', { vegnew }
)});

app.get('/vegnew/:id', (req, res) => {
  res.render('Indexvegnew', {
    vegnew: vegnew[req.params.id],
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

*/