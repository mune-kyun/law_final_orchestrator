FROM node:18-alpine
 
WORKDIR /user/src/app
 
COPY . .
 
# RUN npm install -g yarn

RUN yarn install --frozen-lockfile
 
RUN npm run build
 
USER node

EXPOSE 3000
 
CMD ["npm", "run", "start:prod"]