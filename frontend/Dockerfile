FROM node:alpine AS builder
WORKDIR /opt/app
COPY package.json .
RUN ["yarn", "install"]
COPY . .
RUN ["yarn", "build"]

FROM nginx:alpine
RUN ["apk", "update"]
RUN ["apk", "add", "bash"]
WORKDIR /var/www/html/app
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/app/build .
COPY --from=builder /opt/app/.env.sample .
COPY --from=builder /opt/app/create_static_env.sh .
CMD ["/bin/bash", "-c", "./create_static_env.sh && nginx -g \"daemon off;\""]