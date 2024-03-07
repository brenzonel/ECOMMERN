import mongoose from "mongoose";
//import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conectado a Mongo DB  ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error en MongoDB ${error}`);
    }
};

export default connectDB;