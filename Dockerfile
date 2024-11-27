# Step 1 - Build React app
FROM node:latest as build
WORKDIR /app
COPY package*.json .

RUN npm install

COPY . .
RUN npm run build


# Step 2: Serve Static Files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Add the Nginx configuration file
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]