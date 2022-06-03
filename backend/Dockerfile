FROM node:lts

# 使用淘宝 NPM 镜像（国内机器构建推荐启用）
RUN npm set registry https://registry.npm.taobao.org

# Install PM2
# RUN npm install pm2 -g

# npm install
ADD package*.json /src/
WORKDIR /src
RUN npm i

# build
ADD . /src
RUN npm run build

# move
RUN rm -rf /app \
    && mv dist /app \
    && mv node_modules /app/ \
    && rm -rf /src

EXPOSE 9000

WORKDIR /app
CMD node index.js
# CMD pm2 start pm2.config.js --no-daemon