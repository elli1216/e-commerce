import { Request, Response } from 'express';
import path from 'path';
import { readAndParseXml } from '../utils/parser';
import fs from 'fs';
import { parseStringPromise, Builder } from 'xml2js';

export const getCartItems = async (req: Request, res: Response) => {
  const XML_PATH = path.join(__dirname, '../xml/cart.xml');
  try {
    const cart = await readAndParseXml(XML_PATH);
    res.status(200).json(cart);

  } catch (err: unknown) {
    res.status(500).json({
      message: 'Failed to read or parse cart.xml'
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, price, quantity } = req.body;
  const XML_PATH = path.join(__dirname, '../xml/cart.xml');

  try {
    // Read and parse the XML file
    const xmlData = fs.readFileSync(XML_PATH, 'utf-8');
    const json = await parseStringPromise(xmlData);

    // Find or create the user's cart
    let cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
    if (!cart) {
      cart = {
        userId: [userId],
        items: [{ item: [] }],
        subTotal: ['0']
      };
      json.carts.cart.push(cart);
    }

    let items = cart.items[0].item;
    if (!Array.isArray(items)) items = cart.items[0].item = [];

    // Find the item in the cart
    let item = items.find((i: any) => i.productId[0] === productId);

    if (item) {
      // Update quantity and subtotal if item exists
      item.quantity[0] = String(Number(item.quantity[0]) + Number(quantity));
      item.subTotal = [(Number(item.price[0]) * Number(item.quantity[0])).toFixed(2)];
    } else {
      // Add new item
      items.push({
        productId: [productId],
        price: [price],
        quantity: [String(quantity)],
        arrivingDate: [new Date().toISOString()],
        shippingFee: ['0'],
        subTotal: [(Number(price) * Number(quantity)).toFixed(2)]
      });
    }

    // Update cart subtotal
    const cartSubTotal = items.reduce((sum: number, i: any) => sum + Number(i.subTotal[0]), 0);
    cart.subTotal = [cartSubTotal.toFixed(2)];

    // Write back to XML
    const builder = new Builder();
    const updatedXml = builder.buildObject(json);
    fs.writeFileSync(XML_PATH, updatedXml);

    res.status(200).json({ message: 'Item added to cart successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart.' });
  }
};

export const increaseQuantity = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const XML_PATH = path.join(__dirname, '../xml/cart.xml');
  const xmlData = fs.readFileSync(XML_PATH, 'utf-8');
  const json = await parseStringPromise(xmlData);

  const cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
  if (!cart) return;

  let items = cart.items[0].item;
  if (!Array.isArray(items)) items = [items];

  const item = items.find((i: any) => i.productId[0] === productId);
  if (item) {
    item.quantity[0] = String(Number(item.quantity[0]) + 1);
    item.subTotal[0] = (Number(item.price[0]) * Number(item.quantity[0])).toFixed(2);
  }

  // Update itemCount and subTotal
  const itemCount = items.reduce((sum: number, i: any) => sum + Number(i.quantity[0]), 0);
  cart.itemCount = [String(itemCount)];
  const cartSubTotal = items.reduce((sum: number, i: any) => sum + Number(i.subTotal[0]), 0);
  cart.subTotal = [cartSubTotal.toFixed(2)];

  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.json({ success: true });
};

export const decreaseQuantity = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const XML_PATH = path.join(__dirname, '../xml/cart.xml');
  const xmlData = fs.readFileSync(XML_PATH, 'utf-8');
  const json = await parseStringPromise(xmlData);

  const cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
  if (!cart) return;

  let items = cart.items[0].item;
  if (!Array.isArray(items)) items = [items];

  const item = items.find((i: any) => i.productId[0] === productId);
  if (item && Number(item.quantity[0]) > 1) {
    item.quantity[0] = String(Number(item.quantity[0]) - 1);
    item.subTotal[0] = (Number(item.price[0]) * Number(item.quantity[0])).toFixed(2);
  }

  // Update itemCount and subTotal
  const itemCount = items.reduce((sum: number, i: any) => sum + Number(i.quantity[0]), 0);
  cart.itemCount = [String(itemCount)];
  const cartSubTotal = items.reduce((sum: number, i: any) => sum + Number(i.subTotal[0]), 0);
  cart.subTotal = [cartSubTotal.toFixed(2)];

  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.json({ success: true });
};
