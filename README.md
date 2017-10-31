# wire-webapp-core-run
    
    #!/bin/bash
    EMAIL="mail@server.de"
    PASSWORD="password"
    CONVERSATION_ID="1234567"
    MESSAGE="message for you"
    
    node start2.js  --e="$EMAIL"  --p="$PASSWORD" --c="CONVERSATION_ID" --m="MESSAGE"
    
  



    # start2.js
    var argv = require('optimist')
        .alias('c', 'conversation')
       .alias('e', 'email')
       .alias('m', 'message')
       .alias('p', 'password')
       .argv;
      var cryptobox = require('wire-webapp-cryptobox');
      var wire = require('wire-webapp-core');
  
    var box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
    var user = new wire.User({email: argv.email, password: argv.password}, box);
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
