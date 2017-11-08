// start2.js


var argv = require('optimist')
  .alias('c', 'conversation')
  .alias('e', 'email')
  .alias('m', 'message')
  .alias('p', 'password')
  .argv;

//
argv.email="wire1@robisys.de";
argv.password="K79#Abd46";

var cryptobox = require('wire-webapp-cryptobox');
var wire = require('./core');

var box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
var user = new wire.User({email: argv.email, password: argv.password}, box);
//var user = new wire.User({email: email, password: password}, box);

var connectWebSocket = true;



user
.login(connectWebSocket)
.then(function (service) {
  return service.conversation.sendTextMessage(argv.conversation, argv.message);
})
.then(function (service) {
  return service.user.logout();
})
.catch(function (error) {
  console.log(`Error: ${error.message} (${error.stack})`);
});


