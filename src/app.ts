import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.routes';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/users', UserRoutes);

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API',
  });
};

app.get('/', getController);

export default app;
