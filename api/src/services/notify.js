import amqplib from 'amqplib';

class Notify {
    constructor(data) {
        this.buffer = Buffer.from(JSON.stringify(data));
        this.queueName = process.env.QUEUE_NAME || 'notifications'
    }

    async init() {
        if(!this.connection || !this.channel){
            this.connection = await amqplib.connect(process.env.QUEUE_URI || 'amqp://admin:admin@localhost');
            this.channel = await this.connection.createChannel();
        }
    }

    async send() {
        return this.channel.sendToQueue(this.queueName, this.buffer);
    }
}

export default Notify;
