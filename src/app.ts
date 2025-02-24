import cors from 'cors';
import express, { Application } from 'express';
const app: Application = express()

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
// --- All Routes Here ----

export default app;