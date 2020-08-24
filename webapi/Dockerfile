FROM node:12.16.2

LABEL MAINTAINER="Dev team"

EXPOSE 4201

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "run", "start"]