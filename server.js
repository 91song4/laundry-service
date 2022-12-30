const httpServer = require('./app.js');
require('./socket.js');

httpServer.listen(8080, () => {
  console.log('Server On!');
})