FROM node:18.20.2-alpine3.19

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", ".output/server/index.mjs"]