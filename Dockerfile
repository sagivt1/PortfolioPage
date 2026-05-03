# Stage 1: Build
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM nginx:alpine

# Copy the build output from the build stage
# Angular 17+ with application builder puts output in dist/<project-name>/browser
# Based on angular.json, the project name is PortfolioPage
COPY --from=build /app/dist/PortfolioPage/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
