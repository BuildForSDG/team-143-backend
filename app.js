const config = require('./@core/config.js');
const models = require('./@core/models.js');
const users = require('./@core/users.js');
const auth = require('./@core/auth.js');
const lands = require('./@core/lands.js');
const path = require('path');

var httpServer = config.http.createServer(config.app);
//var httpsServer = config.https.createServer(config.credentials, config.app);

const PORT = process.env.PORT || 8081;

httpServer.listen(PORT, ()=> console.log('Server running on Port: ' + PORT));
//httpsServer.listen(8443);

