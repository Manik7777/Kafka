const { Kafka } = require('kafkajs');

async function runConsumer() {
    const kafka = new Kafka({
        clientId: 'my-kafka-consumer',
        brokers: ['192.168.1.100:9092', '192.168.1.101:9092'],
      });
      
  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

runConsumer().catch((err) => console.error('Error in consumer:', err));
