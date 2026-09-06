# Production Dockerfile for Spatics Landing Page (Optimized for Coolify)
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets and HTML
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Expose HTTP port for Coolify reverse proxy
EXPOSE 80

# Healthcheck for Coolify monitoring
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
