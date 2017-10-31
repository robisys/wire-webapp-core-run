#!/bin/bash

EMAIL="wire1@robisys.de";
PASSWORD="K79#Abd46";

#CONVERSATION_ID="594f0908-b9b7-40f9-a06a-45612145e64e";

CONVERSATION_ID="1f0ad059-1ac4-46c6-bd4c-a689c789a2c2"

MESSAGE="knorkel-message"

node start2.js --e="$EMAIL" --p="$PASSWORD" --c="$CONVERSATION_ID"  --m="MESSAGE"



