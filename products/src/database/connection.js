const mongoose = require('mongoose');

module.exports = async() => {
    const connectionString = `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.DB_HOST}`;
    
    try {
        const conct = await mongoose.connect(connectionString, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conct.connection.host}`);
        
    } catch (error) {
        console.log('Error ============')
        console.log(`Error ${error.message}`);
        process.exit(1);
    }
 
};

 