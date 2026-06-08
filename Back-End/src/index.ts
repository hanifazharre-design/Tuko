import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import eventRoutes from './routes/eventRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import pembicaraRoute from './routes/pembicaraRoute.js';
import ticketRoutes from './routes/ticketRoute.js';

const app = express();
const port = 3000;

// Setup static folder for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors({
  origin: 'http://localhost:5173' // atau cukup cors() untuk mengizinkan semua
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes); // Endpoint: http://localhost:3000/categories
app.use("/speakers", pembicaraRoute);
app.use("/tickets", ticketRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});