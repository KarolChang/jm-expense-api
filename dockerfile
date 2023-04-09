# download image
FROM node:16-alpine3.15

WORKDIR /app
# ADD . /app

# install package
COPY ./package.json ./package-lock.json ./tsconfig.json ./

# docker build
RUN npm i

# COPY . .
COPY . .

# port
# EXPOSE 24000

# RUN npm run build

# docker run
CMD ["npm", "run", "serve"]