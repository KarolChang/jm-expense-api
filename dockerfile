# download image
FROM node:16-alpine3.15

WORKDIR /app
# ADD . /app

# install package
COPY ./package.json ./package-lock.json /app/

# docker build
RUN npm i --legacy-peer-deps

# COPY . /app
COPY . /app

# port
# EXPOSE 24000

# docker run
CMD npm start