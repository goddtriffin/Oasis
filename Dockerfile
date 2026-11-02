FROM node:24.22.2-alpine3.24

# update alpine linux dependencies
RUN apk update
RUN apk add --no-cache make

WORKDIR /oasis

# install dependencies
# (only copy dependency files first for cached layers)
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev

# copy the rest of the project in
COPY . .

# initialize the database
RUN make init_db

# run app
EXPOSE 8080
ENTRYPOINT ["node", "server/app.js"]
