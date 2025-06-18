#!/bin/bash

COMMAND="$1"

if [ "$COMMAND" = "on" ]; then
    echo 'lights turned on'
    exit 0
elif [ "$COMMAND" = "off" ]; then
    echo 'lights turned off'
    exit 0
else
    echo 'unknown command'
    exit 1
fi