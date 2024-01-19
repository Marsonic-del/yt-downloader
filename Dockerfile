FROM node:16
WORKDIR /usr/src/app
COPY . .

RUN npm install --only=production 



CMD [ "npm", "start" ]
