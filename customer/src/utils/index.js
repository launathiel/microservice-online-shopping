const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const amqplib = require('amqplib')

//Utility functions
module.exports.GenerateSalt = async() => {
        return await bcrypt.genSalt()    
},

module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
};


module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
        return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
        return await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '1d'} )
}, 

module.exports.ValidateSignature  = async(req) => {

        const signature = req.get('Authorization');
        
        if(signature){
            const payload = await jwt.verify(signature.split(' ')[1], process.env.APP_SECRET);
            req.user = payload;
            return true;
        }

        return false
};

module.exports.FormateData = (data) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
    }

/* ---------------------- MESSAGE BROKER ---------------------- */

// create a channel
module.exports.CreateChannel = async () => {

        const messageBrokerURLString = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:5672`;

try{
        const connection = await amqplib.connect(messageBrokerURLString)
        const channel = await connection.createChannel()
        await channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', false)
        console.log(`connected to Message Broker on ${process.env.RABBITMQ_HOST}`)
        return channel
}catch(err){
        throw err
}
}

// subscribe message
module.exports.SubscribeMessage = async (channel, service) => {
        const appQueue = await channel.assertQueue(process.env.QUEUE_NAME)

        channel.bindQueue(appQueue.queue, process.env.EXCHANGE_NAME, process.env.CUSTOMER_BINDING_KEY)

        channel.consume(appQueue.queue, data => {
                console.log('received data')
                console.log(data.content.toString())
                service.SubscribeEvents(data.content.toString())
                channel.ack(data)
        })
}