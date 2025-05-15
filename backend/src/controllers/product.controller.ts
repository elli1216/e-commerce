import { Request, Response } from 'express';
import path from 'path';
import { readAndParseXml } from '../utils/parser';

export const getProducts = async (req: Request, res: Response) => {
  const XML_PATH = path.join(__dirname, '../xml/products.xml');
  try {
    const products = await readAndParseXml(XML_PATH);
    res.status(200).json(products);

  } catch (err: unknown) {
    res.status(500).json({
      message: 'Failed to read or parse products.xml'
    });
  }
};