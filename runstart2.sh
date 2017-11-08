#!/bin/bash

EMAIL="wire1@robisys.de";
PASSWORD="password";
CONVERSATION_ID="123456-1234-4567-8901-a689c789a2c2"

MESSAGE="get self"
echo "password  aktualisieren !!!"
echo "email: " $EMAIL $MESSAGE 
LOGFILE="logfile2.txt"
echo "===================================================" >>$LOGFILE
echo "email: " $EMAIL $MESSAGE  >>$LOGFILE
node start2.js --e="$EMAIL" --p="$PASSWORD" --c="$CONVERSATION_ID"  --m="$MESSAGE" >>$LOGFILE



