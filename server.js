// Set NODE_ENV variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load values into process.env
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

const express = require('express');
// Initial server
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const history = require('connect-history-api-fallback');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const getTicker = require('./getTicker');
// const sendTicker = require('./SendTicker');

// Import routes
const users = require('./routes/api/users')
const trades = require('./routes/api/trades')
const trends = require('./routes/api/trends')

// Import model
const Ticker = require('./models/Ticker')

// Apply middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(history());

//DB Config
const db = process.env.MONGODB_URI;

//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err));


// API routes
app.use('/api/users', users);
app.use('/api/trades', trades);
app.use('/api/trends', trends);

// If in production, serve static assets
if(process.env.NODE_ENV === 'production') {
  const publicPath = path.join('client', "build");
  app.use(express.static(publicPath));
  app.get('*', (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'));
});
}

// io.on('connection', (client) => {
//   console.log('NEW CLIENT!')
//   let id = 0;
//     setInterval(()=>
//     {
      
//       Ticker.find().sort({time: -1}).limit(1)
//     .then(ticker=>{
//       console.log(id !== ticker[0]._id)
//       if (ticker[0]._id !== id) {
//         console.log(id !== ticker[0]._id)
//         console.log(ticker[0]._id)
//         console.log(id)
//       id = ticker[0]._id
//       console.log(id)
//       client.emit('ticker', ticker)
//     } else{
//         console.log('not updating')
//       }
//     })}, 1000);

// });

// Start server on port
const port = process.env.PORT || 5000;
http.listen(port, ()=>console.log(`Server started on port ${port}, env=${process.env.NODE_ENV}`))
