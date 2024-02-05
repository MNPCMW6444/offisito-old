import expressSetup from './app/express/expressSetup';
import { connect } from './app/mongo/connection';

// console.log('Starting server but first connecting to mongo,...');
// connect().then(() => expressSetup().catch((e) => console.log(e)));

const startServer = async () => {
    try {
      console.log('Connecting to MongoDB...');
      await connect();
      console.log('MongoDB connected successfully');
  
      console.log('Setting up Express...');
      await expressSetup();
      console.log('Express setup completed');
  
      // Start your server or perform other tasks
    } catch (error) {
      console.error('Error during server startup:', error);
      process.exit(1); // Exit the process with a non-zero code to indicate failure
    }
  };
  
  // Start the server
  startServer();