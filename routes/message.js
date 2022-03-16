
// const express = require('express');
// const router  = express.Router();
// const http = require('http');
// const server = http.createServer(router);
// const { Server } = require("socket.io");
// const io = new Server(server);

// module.exports = (db) => {
//   router.get('/message', (req, res) => {
//     res.render('message');
//   });

//   io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });
//   io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

//   // server.listen(8080, () => {
//   //   console.log('listening on *:8080');
//   // });

//   return router;
// };
