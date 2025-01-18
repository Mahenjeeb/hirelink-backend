import mongoose from 'mongoose';

const connectDB = async (req,resp) => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URL);
        if(!conn) {
            console.log('Error! Connecting database 🥺');
        }
        console.log('Connected ✅');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;