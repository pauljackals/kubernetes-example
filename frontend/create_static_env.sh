#!/bin/bash

file=./env-config.js
echo "window._env_ = {" > $file
while read line; do
    name=${line%?}
    value=${!name}
    if [[ ! -z "$value" ]]; then
        echo "$name: \"$value\"," >> $file
    fi
done < ./.env.sample
echo "}" >> $file