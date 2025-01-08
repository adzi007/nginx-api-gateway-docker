FROM nginx:latest

# RUN apt-get update && apt-get install -y \
#     wget \
#     gcc \
#     libpcre3 \
#     libpcre3-dev \
#     zlib1g \
#     zlib1g-dev \
#     gettext-base \
#     make && \
#     wget http://nginx.org/download/nginx-1.25.2.tar.gz && \
#     tar -xzvf nginx-1.25.2.tar.gz && \
#     cd nginx-1.25.2 && \
#     ./configure --with-http_auth_request_module && \
#     make && \
#     make install && \
#     apt-get remove --purge -y \
#     gcc \
#     make && \
#     rm -rf /var/lib/apt/lists/* nginx-1.25.2* /tmp/* /var/tmp/*

# Install dependencies for JWT validation (optional if needed)
# RUN apt-get install -y gettext-base && apt-get clean

# Copy static files and the NGINX configuration template
# COPY html /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template
# COPY entrypoint.sh /entrypoint.sh
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Expose the NGINX port
EXPOSE 80

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
