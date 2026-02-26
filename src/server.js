import 'dotenv/config';
import express from 'express';
import { connectToDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/test', (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

try {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    console.log(`Express is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}