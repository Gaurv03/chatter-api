import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
    try {
        const dbUri = process.env.MONGO_URI || "";

        await mongoose.connect(dbUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // Optionally add other options here
        });

        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit the process with a failure code
    }
};
export default connectDB