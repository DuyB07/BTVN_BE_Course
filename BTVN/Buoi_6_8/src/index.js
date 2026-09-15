import express from 'express';
import dotenv from 'dotenv';
import rootRouter from './routes/index.js';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { connectionDb } from './configs/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware đọc JSON body
app.use(express.json());
// 

// Root test route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Server is running!',
    timestamp: new Date().toISOString(),
  });
});

app.use(morgan('combined'));
// Gắn toàn bộ router chính vào tiền tố /api
app.use('/api', rootRouter);

// Handler
// 1. NotFound (404)
app.use(notFoundHandler);

// 2. Error handler
app.use(errorHandler);

// Khởi động server
app.listen(PORT, async () => {
  await connectionDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
