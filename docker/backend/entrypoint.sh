#!/bin/sh
set -e

if [ -d /var/www/storage ]; then
    chown -R appuser:appgroup /var/www/storage
    chmod -R 775 /var/www/storage
fi

if [ -d /var/www/bootstrap/cache ]; then
    chown -R appuser:appgroup /var/www/bootstrap/cache
    chmod -R 775 /var/www/bootstrap/cache
fi

if [ "$1" = 'php-fpm' ]; then
    exec "$@"
else
    exec gosu appuser:appgroup "$@"
fi