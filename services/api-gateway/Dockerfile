FROM node:20-alpine as builder

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY services ./services

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm -F shared-types build
RUN pnpm -F api-gateway build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/services/api-gateway/dist ./dist
COPY --from=builder /app/services/api-gateway/package.json ./

EXPOSE 3001

CMD ["node", "dist/index.js"]
