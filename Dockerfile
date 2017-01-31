FROM node:boron

# Create app directory
RUN mkdir -p /web/app
WORKDIR /web/app

# Install web/app dependencies
COPY package.json /web/app/
RUN npm install

# Bundle web/app source
COPY . /web/app/

EXPOSE 8000
CMD [ "npm", "run", "start" ]