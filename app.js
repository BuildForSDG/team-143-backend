const config = require('./@core/config.js');
const models = require('./@core/models.js');
const users = require('./@core/users.js');
var httpServer = config.http.createServer(config.app);
//var httpsServer = config.https.createServer(config.credentials, config.app);

httpServer.listen(8081);
//httpsServer.listen(8443);