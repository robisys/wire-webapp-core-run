#!/bin/bash

EMAIL="wire@robisys.de";
PASSWORD="Password";
CONVERSATION_ID= "12345678-1234-1234-1234-123456789012"

#CONVERSATION_ID=""

echo "Email:"$EMAIL  $MESSAGE  $CONVERSATION_ID

MESSAGE="hallo get self"
LOGFILE="logfile3.txt"

echo "======================================================="  >>$LOGFILE
echo "Email:"$EMAIL  $MESSAGE  $CONVERSATION_ID   >>$LOGFILE
node start2.js --e="$EMAIL" --p="$PASSWORD" --c="$CONVERSATION_ID"  --m="$MESSAGE"  >>$LOGFILE



