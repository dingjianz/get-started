# FROM hub.iflytek.com/xfyun_webdev/keymetrics/pm2:8-alpine
FROM hub.iflytek.com/xfyun_webdev/node:12.16.1-alpine3.9-v1
#FROM keymetrics/pm2:8-alpine
MAINTAINER yedai@iflytek.com

# Bundle APP files
WORKDIR /frontend/gaia/

# CMD ["npm", "start"]

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

# Expose the listening port of your app
EXPOSE 3010

COPY ./frontend/gaia /frontend/gaia/

ENTRYPOINT []

# CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
CMD ["npm", "start"]
# Show current folder structure in logs
# RUN ls -al -R
