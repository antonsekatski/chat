import express from 'express'
import { createServer } from 'http'
import socketIO from 'socket.io'

const app = express()
const server = createServer(app)
const io = socketIO(server)
/************************************************************
 * Socket.IO
 *
 ************************************************************/
// Super simple storage for messages and roster
const roster = {}
const history = []

io.on('connection', socket => {
  // Convert roster from being SocketID -> User to UserID -> User map
  io.emit('state', { roster, history })

  socket.on('message', msg => {
    history.push(msg)
    socket.broadcast.emit('message', msg)
    console.log('new message', msg);
  })

  socket.on('presence', user => {
    roster[socket.id] = user
    io.emit('presence', { id: socket.id, user })
    console.log('user connected');
  })

  socket.on('disconnect', () => {
    const user = roster[socket.id]
    delete roster[socket.id]
    io.emit('disconnect', { id: socket.id, user })
    console.log('user disconnected');
  })

  socket.on('update_user', (user) => {
    roster[socket.id] = user
    socket.broadcast.emit('update_user', { id:socket.id, user })
  })
})

/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:9090/build/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css');
  } else {
    res.redirect('//localhost:9090/build/style.css');
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
server.listen(port)
console.log('Start server on http://localhost:8080')
