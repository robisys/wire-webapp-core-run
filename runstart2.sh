#!/bin/bash

EMAIL="wire1@robisys.de";
PASSWORD="K79#Abd46";

#CONVERSATION_ID="594f0908-b9b7-40f9-a06a-45612145e64e";

CONVERSATION_ID="1f0ad059-1ac4-46c6-bd4c-a689c789a2c2"

MESSAGE="knorkel-message"
#0
#EMAIL="wire@robisys.de"
#PASSWORD="P#a48Gb8"
#1
#EMAIL="wire1@robisys.de"
#PASSWORD="K79#Abd46"
#
#EMAIL="name@email.com"
#PASSWORD="password"
#2
#EMAIL="wire2@robisys.de"
#PASSWORD="H84#67bK"

node start2.js --e="$EMAIL" --p="$PASSWORD" --c="$CONVERSATION_ID"  --m="MESSAGE"



