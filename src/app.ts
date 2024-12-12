import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
const app: Application = express();
//Middleware to parse incoming JSON request
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://dictionary-app12.netlify.app',
    'https://dictionary-app-63471.web.app',
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
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
