FROM node:19
WORKDIR /myWorkingDirectory
# or COPY package.json /myWorkingDirectory/
COPY package.json . 
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
# or COPY . /myWorkingDirectory/
COPY . .  
ENV PORT 3000
EXPOSE $PORT
CMD [ "node", "index.js" ]
