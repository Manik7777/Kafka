const { Kafka } = require('kafkajs');

async function runProducer() {
    const kafka = new Kafka({
        clientId: 'my-kafka-producer',
        brokers: ['192.168.1.100:9092', '192.168.1.101:9092'],
      });
      

  const producer = kafka.producer();

  await producer.connect();

  // Sending a sample message to a topic called "test-topic"
  await producer.send({
    topic: 'test-topic',
    messages: [
      {
        value: 'Hello, Kafka!',
      },
    ],
  });

  await producer.disconnect();
}

runProducer().catch((err) => console.error('Error in producer:', err));
