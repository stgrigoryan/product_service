import express, { Request, Response } from 'express';
import userRoutes from './router/product';
import startApp from './startApp';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('App is started and running');
});

app.use('/products', userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Not found:  ${req.originalUrl}` });
});

const main = async () => {
  try {
    await startApp(app);
  } catch (error) {
    console.error(`Error while starting the app: ${error}`);
    process.exit(1);
  }
};

main();
