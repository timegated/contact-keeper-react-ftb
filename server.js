const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to contactkeeper api...'})
})

// Init Middleware

app.use(express.json({ extended: false }));

// Connect DB

connectDB();

// Define Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})