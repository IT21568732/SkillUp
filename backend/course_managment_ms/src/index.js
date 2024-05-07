const app = require('./app')
const connectDB = require('./config/db')
// Define routes, middleware, etc. here

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
