#!/bin/bash

EMAIL="wire1@robisys.de";
PASSWORD="K79#Abd46";
CONVERSATION_ID="1f0ad059-1ac4-46c6-bd4c-a689c789a2c2"

MESSAGE="get self"

echo "email: " $EMAIL $MESSAGE 
LOGFILE="logfile2.txt"
echo "===================================================" >>$LOGFILE
echo "email: " $EMAIL $MESSAGE  >>$LOGFILE
node start2.js --e="$EMAIL" --p="$PASSWORD" --c="$CONVERSATION_ID"  --m="$MESSAGE" >>$LOGFILE



