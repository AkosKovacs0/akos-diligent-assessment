# Use official Node.js LTS image
FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    sqlite3 \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set up shell for better developer experience
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p git \
    -p node \
    -p npm

# Create data directory for SQLite database
RUN mkdir -p /workspace/data && chown -R node:node /workspace

USER node

