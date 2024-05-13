const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://user:pass@cluster0.exnfnoi.mongodb.net/?retryWrites=true&w=majorit';

const connectDB = async () => {
  try {
    if (!mongoURI) {
      return new Error("Missing MONGODB_DATABASE env variable.");
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: 'majority',
        wtimeout: 5000
      }
    });
    console.log("DB connections successful!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;