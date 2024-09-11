FROM arm64v8/node:lts-alpine

WORKDIR /app

RUN apk add --no-cache curl

RUN mkdir -p /app/data

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["pnpm", "run", "start"]