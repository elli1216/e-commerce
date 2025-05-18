import { Request, Response } from 'express';
import path from 'path';
import { readAndParseXml } from '../utils/parser';
import fs from 'fs';
import { parseStringPromise, Builder } from 'xml2js';
import { v4 as uuidv4 } from 'uuid';

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

export const addOrder = async (req: Request, res: Response) => {
  const { userId, items, orderTotal } = req.body;
  const XML_PATH = path.join(__dirname, '../xml/orders.xml');
  const xmlData = fs.readFileSync(XML_PATH, 'utf-8');
  const json = await parseStringPromise(xmlData);

  // Prepare new order
  const newOrder = {
    id: [`${uuidv4()}`],
    userId: [userId],
    date: [new Date().toISOString()],
    items: [
      {
        item: Array.isArray(items) ? items.map(i => ({
          productId: [i.productId],
          roductName: [i.productName ?? ''],
          quantity: [i.quantity],
          status: ['Preparing'],
          arrivingDate: [new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()],
          subTotal: [i.subTotal ?? '']
        })) : []
      }
    ],
    orderTotal: [orderTotal]
  };

  // Add to orders
  if (!json.orders.order) json.orders.order = [];
  json.orders.order.push(newOrder);

  // Write back to XML
  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.status(201).json({ message: 'Order placed successfully.' });
};