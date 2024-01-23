import { Router, Request, Response } from 'express';
import { createProduct } from '../services/product';
import { validateProduct } from '../validators/validateProduct';
import { IProduct } from '../models/product';
import { sendMessage } from '../queue/messageSender';
import { consumeMessage } from '../queue/messageConsumer';

const router = Router();

router.post('/', validateProduct, async (req: Request, res: Response) => {
  try {
    const product = <IProduct>req.body;
    await Promise.all([
      createProduct(product),
      sendMessage(JSON.stringify(product)),
    ]);
    res.status(201).send('Product successfully created and sent to queue.');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Something happened while creating a product or sending to queue: ${error}`,
    });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const message = await consumeMessage();
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to consume message: ${error}` });
  }
});

export default router;
