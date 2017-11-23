#!/bin/sh

wait_db() {
    echo -e "started to wait $API_HOST..."
    until curl "$API_HOST:$API_PORT" > /dev/null 2>&1; do
        >&2 echo -e "$API_HOST is unavailable - waiting..."
        sleep 3
    done

    >&2 echo "$API_HOST is up!"
}

wait_db

nginx -g daemon off;
