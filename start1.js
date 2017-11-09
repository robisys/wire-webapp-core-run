// start1.js

/*
var argv = require('optimist')
  .alias('c', 'conversation')
  .alias('e', 'email')
  .alias('m', 'message')
  .alias('p', 'password')
  .argv;
*/
//
var email="wire1@robisys.de";
var password="K79#Abd46";
var conversation="1f0ad059-1ac4-46c6-bd4c-a689c789a2c2";
var message= "message";

var cryptobox = require('wire-webapp-cryptobox');
var wire = require('./core');

var box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
//var user = new wire.User({email: argv.email, password: argv.password}, box);
var user = new wire.User({email: email, password: password}, box);

var connectWebSocket = true;

//console.log("Start:  email= ",argv.email," password= ",pargv.assword);
console.log("Start:  email= ",email, " ",password);


user
.login(connectWebSocket)
.then(function (service) {
    //return service.conversation.sendTextMessage(argv.conversation, argv.message);
  return service.conversation.sendTextMessage(conversation, message);
})
.then(function (service) {
  return service.user.logout();
})
.catch(function (error) {
  console.log(`Error: ${error.message} (${error.stack})`);
});

