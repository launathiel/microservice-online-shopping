const express = require('express');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const dotenv = require('dotenv-flow');
const { CreateChannel } = require('./utils');

dotenv.config({
  node_env: process.env.NODE_ENV || 'dev',
});

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    
    const channel = await CreateChannel();

    await expressApp(app, channel);

    app.listen(process.env.PORT, () => {
        console.log(`Shopping service is listening to port ${process.env.PORT}`);
        console.log(`${process.env.MESSAGE}`)
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();