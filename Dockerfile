# pull official base image
FROM node:15.3.0-alpine3.11

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
COPY .npmrc ./
# COPY package-lock.json ./
# RUN npm install --silent
RUN npm install
# RUN npm install react-scripts -g --silent
RUN npm install react-scripts -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]