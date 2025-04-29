# Step 1: Build Angular App
FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod --base-href=/


# Step 2: Serve App with Nginx
FROM nginx:alpine

# Copy built app
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# (Optional) Expose port if needed
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
