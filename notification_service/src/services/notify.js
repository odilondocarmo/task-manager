import amqplib from 'amqplib';

class Notify {
    constructor() {
        this.connection = null
        this.channel = null
        this.queueName = process.env.QUEUE_NAME || 'notifications'
    }

    async init() {
        if(!this.connection || !this.channel){
            this.connection = await amqplib.connect(process.env.QUEUE_URI || 'amqp://admin:admin@localhost');
            this.channel = await this.connection.createChannel();
            this.channel.assertQueue(this.queueName)
        }
    }

    async startConsumer(callback) {
        return this.channel.consume(this.queueName, message => {
            const resp = message.content.toString()
            this.channel.ack(message)
            return callback(resp)
        });
    }
}

export default Notify;
