import mongoose from "mongoose";

const connectDataBase = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connect mongodb successfully ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDataBase;
