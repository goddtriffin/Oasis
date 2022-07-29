FROM node:18.7.0-alpine3.16

# update alpine linux dependencies
RUN apk update
RUN apk add --no-cache make

WORKDIR /oasis

# install dependencies
# (only copy dependency files first for cached layers)
COPY package.json .
COPY package-lock.json .
RUN npm ci --only=production

# copy the rest of the project in
COPY . .

# run app
EXPOSE 8080
CMD ["make", "run"]
