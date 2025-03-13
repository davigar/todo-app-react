const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Todo API is running');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;