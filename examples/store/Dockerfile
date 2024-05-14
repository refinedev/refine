FROM refinedev/node:18 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps

RUN apk add --no-cache libc6-compat openssh-client

COPY package.json pnpm-lock.yaml .npmrc ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM base AS builder

COPY --from=deps /app/refine/node_modules ./node_modules

COPY . .

ENV CI true

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm run build --scope store --skipNxCache

RUN ls -l /app/refine/examples/store/.next/standalone/

FROM base AS runner

ENV NODE_ENV production

COPY --from=builder /app/refine/examples/store/public ./public

RUN mkdir .next
RUN chown refine:nodejs .next

RUN rm -rf node_modules

COPY --from=builder --chown=refine:nodejs /app/refine/examples/store/.next/standalone ./

USER refine

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "./examples/store/server.js"]
