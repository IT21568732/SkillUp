const amqplib = require("amqplib");
const {
  MSG_QUEUE_URL,
  EXCHANGE_NAME,
  AUTH_ROUTING_KEY,
  QUEUE_NAME,
} = require("../config/index.config");

//? Create a channel
const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", {
      durable: true,
    });
    console.log("Channel created");
    return channel;
  } catch (err) {
    console.log("Error createing channel: ", err);
  }
};

//? Publish message to queue
const PublishMessage = async (channel, routingKey, msg) => {
  try{
    await channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(msg));
    console.log(`${msg} sent: ${routingKey} service`);
  }catch(error){
    console.log(error)
  }
};

//? Consume message from queue
const SubscribeMessages = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

  //!Create queue
  const appQueue = await channel.assertQueue(QUEUE_NAME);

  //!Bind Queue
  // This consumer will concume messages from Auth Only
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, AUTH_ROUTING_KEY);

  //!concume messages from queue
  channel.consume(appQueue.queue, data => {
    console.log('received data')
    console.log(data.content.toString())
    service.SubscribeEvents(data.content.toString())
    channel.ack(data);
  });
};

module.exports = {
  CreateChannel,
  PublishMessage,
  SubscribeMessages,
}; 