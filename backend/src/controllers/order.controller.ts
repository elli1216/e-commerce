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
  const { userId, items, orderTotal, shippingFee } = req.body;
  const XML_PATH = path.join(__dirname, '../xml/orders.xml');
  const xmlData = fs.readFileSync(XML_PATH, 'utf-8');
  const json = await parseStringPromise(xmlData);

  // Add to orders
  if (!json.orders) json.orders = {};
  if (!json.orders.order) json.orders.order = [];

  // Prepare new order
  const newOrder = {
    id: [`${uuidv4()}`],
    userId: [userId],
    date: [new Date().toISOString()],
    items: [
      {
        item: Array.isArray(items)
          ? items.map(i => ({
            productId: [i.productId],
            productName: [i.productName ?? ''],
            quantity: [i.quantity],
            status: ['Preparing'],
            shippingFee: [i.shippingFee],
            arrivingDate: [new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()],
            subTotal: [i.subTotal ?? '']
          }))
          : [
            {
              productId: [items.productId],
              productName: [items.productName ?? ''],
              quantity: [items.quantity],
              status: ['Preparing'],
              shippingFee: [items.shippingFee],
              arrivingDate: [new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()],
              subTotal: [items.subTotal ?? '']
            }
          ]
      }
    ],
    orderTotal: [orderTotal],
  };

  json.orders.order.push(newOrder);

  // Write back to XML
  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  // Remove the user's cart
  const CART_XML_PATH = path.join(__dirname, '../xml/cart.xml');
  const cartXmlData = fs.readFileSync(CART_XML_PATH, 'utf-8');
  const cartJson = await parseStringPromise(cartXmlData);

  if (cartJson.carts && cartJson.carts.cart) {
    if (Array.isArray(cartJson.carts.cart)) {
      cartJson.carts.cart = cartJson.carts.cart.filter((c: any) => c.userId[0] !== userId);
    } else if (cartJson.carts.cart.userId && cartJson.carts.cart.userId[0] === userId) {
      // Only one cart and it's the user's cart, so remove it
      cartJson.carts.cart = [];
    }
  }

  const cartBuilder = new Builder();
  const updatedCartXml = cartBuilder.buildObject(cartJson);
  fs.writeFileSync(CART_XML_PATH, updatedCartXml);

  res.status(201).json({ message: 'Order placed successfully.' });
};