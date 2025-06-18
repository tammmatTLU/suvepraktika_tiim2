#!/bin/bash

COMMAND="$1"

if [ "$COMMAND" = "on" ]; then
    echo 'projector turning on'
    sleep 4
    echo 'projector turned on'
    exit 0
elif [ "$COMMAND" = "off" ]; then
    echo 'projector turning off'
    sleep 2
    echo 'projector turned off'
    exit 0
else
    echo 'unknown command'
    exit 1
fi