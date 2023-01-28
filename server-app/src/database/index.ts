import mongoose from 'mongoose';
import { MONGO_URI } from '../utils/constant';

// Connection URI
const mongoURI = MONGO_URI;

// Connection options
const options = {
    // useMongoClient: true,
    autoIndex: true, // build indexes
};

// Establish connection with mongoDB
const connect = () => {
    mongoose.connect(mongoURI, options)
        .then(() => {
            console.log('✅ ✅ ✅ --- Mongo DB connected --- ✅ ✅ ✅');
        })
        .catch((err: any) => console.log(`Error while connecting to database :: ${err}`));
};

const disconnect = () => {
    if (!mongoose.connection) {
        return;
    }
    mongoose.disconnect();
    mongoose.connection.once('close', async () => {
        console.log('Disconnected from database');
    });
}

export default {
    connect,
    disconnect
};
