#!/bin/bash

COMMAND="$1"

if [ "$COMMAND" = "on" ]; then
    echo 'projector turning on'
    sleep 4
    echo 'projector turned on'
    sleep 4
    exit 0
elif [ "$COMMAND" = "off" ]; then
    echo 'projector turning off'
    sleep 4
    echo 'projector turned off'
    sleep 4
    exit 0
else
    echo 'unknown command'
    exit 1
fi