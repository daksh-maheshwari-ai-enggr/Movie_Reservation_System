import mongoose from 'mongoose';
import dns from 'dns';

/**
 * Network Configuration Override
 * Forces Node.js to use Google's Public DNS to bypass local ISP or firewall DNS blocks.
 */
dns.setServers(['8.8.8.8', '8.8.4.4']);

/**
 * @function connectDB
 * @desc Establishes an asynchronous connection to the MongoDB Atlas database.
 *       If the connection fails, it logs the error and terminates the Node process.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection Failed: ${error.message}`);
    // Exit process with failure code (1) to prevent the app from running without a database
    process.exit(1); 
  }
};

export default connectDB;