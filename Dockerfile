# Use the Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:latest

# Set the working directory in the container
WORKDIR /app

# Copy your app files into the container
COPY . /app
USER root


# Install dependencies
RUN npm install

# Expose port if necessary (adjust this if your app listens on a specific port)
EXPOSE 3000

# Command to run your app
CMD ["node", "index.js"]
