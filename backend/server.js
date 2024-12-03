const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Routes for employees
app.use('/api', employeeRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log('Database connected and synchronized.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch(err => {
    console.error('Error connecting to the database:', err);
});
