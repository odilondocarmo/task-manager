import amqplib from 'amqplib';

class Notify {
    constructor(data) {
        this.buffer = Buffer.from(JSON.stringify(data));
        this.queueName = 'notifications';
    }

    async init() {
        this.connection = await amqplib.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
    }

    async send() {
        return this.channel.sendToQueue(this.queueName, this.buffer);
    }
}

export default Notify;
