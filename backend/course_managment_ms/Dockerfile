#official node runtime as the base image
FROM node:14-alphine3.16

#set the working derectory in the container
WORKDIR /app/courses

#copy package.json and package-lock.json to working derectory
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest os code to the working derectory
COPY . .

#expose port the app run on
EXPOSE 8001

# Define environment variables
ENV MONGO_URL=mongodb://mongo:27017/mydatabase
ENV PORT=8001
ENV MONGO_URL=mongodb+srv://user:pass@cluster0.exnfnoi.mongodb.net/?retryWrites=true&w=majorit
ENV MSG_QUEUE_URL=amqps://sfmdrjiq:4bhkQSjv0YZvYjS5T5RNSIYwBt4GiX2e@chimpanzee.rmq.cloudamqp.com/sfmdrjiq

ENV CLOUD_NAME=dcrph6wra
ENV API_KEY=974971435681199
ENV API_SECRET=qjSru6DLKlgtyU3e71tgJQ-uyq8

ENV JWT_SECRET=dw65as2

#run application
CMD ["npm", "start"]
