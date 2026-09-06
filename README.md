# SPATICS™ — Sovereign Autonomous Flight Stack

Official coming-soon landing page for **SPATICS Technologies** ([spatics.in](https://spatics.in)).

Engineering India’s Sovereign Autonomous Flight Stack: Indigenous UAV avionics, carbon-composite aerostructures, and Circute.ai (conversational AI-EDA).

---

## Tech Stack
- **Structure**: Standalone HTML5 (`index.html`)
- **Styling**: Tailwind CSS via CDN (`cdn.tailwindcss.com`)
- **Icons**: Lucide Icons via CDN (`unpkg.com/lucide@latest`)
- **Fonts**: Space Grotesk & JetBrains Mono (Google Fonts)
- **Container Server**: Nginx Alpine (`Dockerfile` + `nginx.conf`)

---

## Deploying on Coolify

This repository is pre-configured for zero-config deployment on **[Coolify](https://coolify.io)**:

1. **New Application in Coolify**:
   - Go to your Coolify dashboard.
   - Click **+ Create New Resource** -> **Application**.
   - Select **Public Repository** (or **GitHub App / Private Repository** if private).
   - Enter your repository URL: `https://github.com/Spatics/spatics-in`
   - Branch: `main`

2. **Build Pack**:
   - Coolify will automatically detect the **`Dockerfile`**.
   - If prompted for Build Pack, select **Dockerfile**.
   - Port: `80` (pre-configured).

3. **Domain & SSL**:
   - Set your domain in Coolify (e.g. `https://spatics.in` or `https://www.spatics.in`).
   - Coolify will automatically provision free Let's Encrypt SSL certificates.

4. **Deploy**:
   - Click **Deploy**.
   - The Nginx Alpine container will build and serve instantly with automatic caching and gzip compression.

---

## Local Development

You can serve this page locally with any static web server:

```bash
# Python 3
python3 -m http.server 3000

# or Docker
docker build -t spatics-in .
docker run -p 3000:80 spatics-in
```

Visit `http://localhost:3000/`.
