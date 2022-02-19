FROM alpine:3.15.0

# install node.js/npm
RUN apk add --update make nodejs npm

WORKDIR /oasis

# install dependencies
# (only copy dependency files first for cached layers)
COPY package*.json .
RUN npm ci --only=production

# copy the rest of the project in
COPY . .

# run app
EXPOSE 8080
CMD ["make", "run"]
