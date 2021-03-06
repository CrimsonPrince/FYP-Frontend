# Builder Image
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY Cleanspace/package*.json /app/
RUN npm install
COPY ./Cleanspace /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Nginx Image
FROM nginx:1.15
#Copying From Builder Image to this one
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
