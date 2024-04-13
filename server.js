// importing packages and routes
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// setting up PORT 
const PORT = process.env.PORT || 3001; 
const app = express(); 


// app.use((req,res,next) => {

// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// Server listening to client request and text is logged in console
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);