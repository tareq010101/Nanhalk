const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');

dotenv.config({ path: './config.env' });

const app = require('./app');
const { setupWebSocket } = require('./webSocket/websocket');

const DB = process.env.MONGO_URI;

mongoose.connect(DB)
  .then(() => console.log(' DB connection successful'))
  .catch(err => console.error(' DB connection error:', err));

const PORT = process.env.PORT || 5000;

// هنا نستخدم server بدل app.listen
const server = http.createServer(app);

// WebSocket setup
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
