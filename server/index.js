const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const movieRoutes = require('./routes/movies.routes.js');
const userRoutes = require('./routes/userRoutes.js');
const theaterRoutes = require('./routes/theater.routes.js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/admin', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin',theaterRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});