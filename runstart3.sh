#!/bin/bash

EMAIL="wire@robisys.de";
PASSWORD="P#a48Gb8";
CONVERSATION_ID="1f0ad059-1ac4-46c6-bd4c-a689c789a2c2"

#CONVERSATION_ID="1f0ad059-1ac4-46c6-bd4c-a689c789a2c2"

echo "Email:"$EMAIL  $MESSAGE  $CONVERSATION_ID

MESSAGE="hallo get self"
LOGFILE="logfile3.txt"

echo "======================================================="  >>$LOGFILE
echo "Email:"$EMAIL  $MESSAGE  $CONVERSATION_ID   >>$LOGFILE
node start2.js --e="$EMAIL" --p="$PASSWORD" --c="$CONVERSATION_ID"  --m="$MESSAGE"  >>$LOGFILE



