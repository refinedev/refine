FROM refinedev/node:18 AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat openssh-client

COPY package.json package-lock.json .npmrc ./

RUN npm pkg delete scripts.prepare
RUN npm ci

FROM base AS builder

COPY --from=deps /app/refine/node_modules ./node_modules

COPY . .

ENV CI true

RUN npm run bootstrap -- --scope @refinedev/live-previews
RUN npm run build -- --scope @refinedev/live-previews

FROM base AS runner

ENV NODE_ENV production

COPY --from=builder /app/refine/packages/live-previews/public ./public

RUN mkdir .next
RUN chown refine:nodejs .next

COPY --from=builder --chown=refine:nodejs /app/refine/packages/live-previews/.next/standalone/packages/live-previews ./
COPY --from=builder --chown=refine:nodejs /app/refine/packages/live-previews/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=refine:nodejs /app/refine/packages/live-previews/.next/static ./.next/static

USER refine

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_OPTIONS "--max-http-header-size=32767"

CMD ["node", "server.js"]
