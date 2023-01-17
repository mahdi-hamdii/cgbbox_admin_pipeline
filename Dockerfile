FROM node:16.15.1

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 8080

CMD [ "npm", "run" , "serve" ]