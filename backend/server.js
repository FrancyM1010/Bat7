const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const resultRoutes = require('./routes/results');

const app = express();
app.use(express.json());

mongoose.connect(require('./config').mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
