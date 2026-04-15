FROM node:20-alpine

WORKDIR /app

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY services ./services

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build shared types
RUN pnpm -F shared-types build

# Build service
ARG SERVICE_NAME
RUN pnpm -F ${SERVICE_NAME} build

EXPOSE 3000

CMD ["sh", "-c", "pnpm -F ${SERVICE_NAME} start"]
