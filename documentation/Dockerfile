FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /opt/app

RUN apk add git openssh-client

ENV NODE_ENV development

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./
COPY . /opt/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

ENV LIVE_PREVIEW_URL=https://next.live-previews.refine.dev/preview

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm run build

FROM base

COPY --from=prod-deps /opt/app/documentation/node_modules /opt/app
COPY --from=build /opt/app/documentation/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN pnpm install -g serve

CMD serve -l 80
