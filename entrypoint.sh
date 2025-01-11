#!/bin/bash



# Replace placeholders in nginx.conf.template with environment variables
envsubst '${MICROSERVICE_AUTH_HOST} ${MICROSERVICE_AUTH_PORT} ${MICROSERVICE_AUTH_REALM} ${MICROSERVICE_CART_HOST} ${MICROSERVICE_CART_PORT} ${MICROSERVICE_PRODUCTS_HOST} ${MICROSERVICE_PRODUCTS_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Example multiple microservices variable
# envsubst '${MICROSERVICE_CART_HOST} ${MICROSERVICE_CART_PORT} ${MICROSERVICE_USERS_HOST} ${MICROSERVICE_USERS_PORT} ${MICROSERVICE_PRODUCTS_HOST} ${MICROSERVICE_PRODUCTS_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf


# Start NGINX
exec "$@"
