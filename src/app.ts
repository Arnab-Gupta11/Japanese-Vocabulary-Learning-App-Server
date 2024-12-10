import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();
//Middleware to parse incoming JSON request
app.use(express.json());
// app.use(cors());
//Application Routes
// app.use('/api/v1', router);
//Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Japanese Vocabulary Server Live',
  });
});

app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
