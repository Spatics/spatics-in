# Production Dockerfile for Spatics Landing Page (Optimized for Coolify)
FROM nginx:alpine

# Install curl for reliable container healthchecks
RUN apk add --no-cache curl

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets and HTML
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/
COPY healthz /usr/share/nginx/html/healthz
COPY health /usr/share/nginx/html/health

# Expose HTTP port for Coolify reverse proxy
EXPOSE 3000

# Healthcheck for Coolify monitoring and Docker container health
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=5 \
  CMD curl -f -s http://127.0.0.1:3000/healthz || wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
