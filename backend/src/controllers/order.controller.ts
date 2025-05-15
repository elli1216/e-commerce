import { Request, Response } from 'express';
import { readAndParseXml } from '../utils/parser';
import path from 'path';

export const getOrders = async (req: Request, res: Response) => {
  const XML_PATH = path.join(__dirname, '../xml/orders.xml');
  try {
    const orders = await readAndParseXml(XML_PATH);
    res.status(200).json(orders);

  } catch (err: unknown) {
    res.status(500).json({
      message: 'Failed to read or parse orders.xml'
    });
  }
};