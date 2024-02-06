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

RUN npm run bootstrap -- --scope store
RUN npm run build -- --scope store

FROM base AS runner

ENV NODE_ENV production

COPY --from=builder /app/refine/examples/store/public ./public

RUN mkdir .next
RUN chown refine:nodejs .next

COPY --from=builder --chown=refine:nodejs /app/refine/examples/store/.next/standalone/examples/store ./
COPY --from=builder --chown=refine:nodejs /app/refine/examples/store/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=refine:nodejs /app/refine/examples/store/.next/static ./.next/static

USER refine

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
