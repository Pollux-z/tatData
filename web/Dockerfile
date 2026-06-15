FROM node:22.22.3-alpine3.23 AS deps

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


FROM node:22.22.3-alpine3.23 AS builder

WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build


FROM node:22.22.3-alpine3.23 AS runner

# Patch OS packages (libssl/libcrypto) and bundled npm (vulnerable picomatch)
RUN apk upgrade --no-cache && npm install -g npm@latest

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["pnpm", "start"]