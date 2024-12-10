import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
const app: Application = express();
//Middleware to parse incoming JSON request
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//Application Routes
app.use('/api/v1', router);
//Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Japanese Vocabulary Server Live',
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
