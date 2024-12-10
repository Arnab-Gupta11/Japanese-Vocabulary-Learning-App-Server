import express, { Application, Request, Response } from 'express';

const app: Application = express();
//Middleware to parse incoming JSON request
app.use(express.json());

//Application Routes


//Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Japanese Vocabulary Server Live',
  });
});

//Fallback Route: hadle all undefined routes
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not Found',
  });
});

export default app;
