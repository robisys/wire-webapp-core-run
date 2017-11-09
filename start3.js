// start2.js


var argv = require('optimist')
  .alias('c', 'conversation')
  .alias('e', 'email')
  .alias('m', 'message')
  .alias('p', 'password')
  .argv;

/*
var email="wire1@robisys.de";
var password="K79#Abd46";
*/

var cryptobox = require('wire-webapp-cryptobox');
var wire = require('./core');
const path = require('path');
const {FileEngine} = require('./store');

console.log("Start:   ",argv.email,"",argv.password);

const login = {
  email: argv.email,
  handle: argv.handle,
  password: argv.password,
  persist: true,
};

var box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
var user = new wire.User({email: argv.email, password: argv.password}, box);
//var user = new wire.User({email: email, password: password}, box);

var connectWebSocket = true;

const storagePath = path.join(process.cwd(), '.tmp', login.email);


const config = {
  store: new FileEngine(storagePath, {fileExtension: '.json'}),
};


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


