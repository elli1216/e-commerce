import { Request, Response } from "express";
import path from "path";
import { readAndParseXml } from "../utils/parser";
import fs from "fs";
import { parseStringPromise, Builder } from "xml2js";

export const getCartItems = async (req: Request, res: Response) => {
  const XML_PATH = path.join(__dirname, "../xml/cart.xml");
  try {
    const cartData = (await readAndParseXml(XML_PATH)) as any;

    // Ensure consistent array structure for cart items
    if (cartData.cart && !Array.isArray(cartData.cart)) {
      cartData.cart = [cartData.cart];
    }

    // Ensure each cart's items are always in array format
    if (cartData.cart) {
      cartData.cart.forEach((cart: any) => {
        if (cart.items && cart.items.item) {
          if (!Array.isArray(cart.items.item)) {
            cart.items.item = [cart.items.item];
          }
        }
      });
    }

    res.status(200).json(cartData);
  } catch (err: unknown) {
    res.status(500).json({
      message: "Failed to read or parse cart.xml",
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, price, quantity, shippingFee = 0 } = req.body;
  const XML_PATH = path.join(__dirname, "../xml/cart.xml");

  try {
    // Read and parse the XML file
    const xmlData = fs.readFileSync(XML_PATH, "utf-8");
    const json = await parseStringPromise(xmlData);

    // Find or create the user's cart
    let cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
    if (!cart) {
      cart = {
        userId: [userId],
        items: [{ item: [] }],
        subTotal: ["0"],
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
      item.subTotal = [
        (
          Number(item.price[0]) * Number(item.quantity[0]) +
          Number(item.shippingFee[0])
        ).toFixed(2),
      ];
    } else {
      // Add new item
      items.push({
        productId: [productId],
        price: [price],
        quantity: [String(quantity)],
        arrivingDate: [new Date().toISOString()],
        shippingFee: [String(shippingFee)],
        subTotal: [
          (Number(price) * Number(quantity) + Number(shippingFee)).toFixed(2),
        ],
      });
    }

    // Update cart subtotal
    const cartSubTotal = items.reduce(
      (sum: number, i: any) => sum + Number(i.subTotal[0]),
      0
    );
    cart.subTotal = [cartSubTotal.toFixed(2)];

    // Write back to XML
    const builder = new Builder();
    const updatedXml = builder.buildObject(json);
    fs.writeFileSync(XML_PATH, updatedXml);

    res.status(200).json({ message: "Item added to cart successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item to cart." });
  }
};

export const increaseQuantity = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const XML_PATH = path.join(__dirname, "../xml/cart.xml");
  const xmlData = fs.readFileSync(XML_PATH, "utf-8");
  const json = await parseStringPromise(xmlData);

  const cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
  if (!cart) return;

  let items = cart.items[0].item;
  if (!Array.isArray(items)) items = [items];

  const item = items.find((i: any) => i.productId[0] === productId);
  if (item) {
    item.quantity[0] = String(Number(item.quantity[0]) + 1);
    item.subTotal[0] = (
      Number(item.price[0]) * Number(item.quantity[0]) +
      Number(item.shippingFee[0])
    ).toFixed(2);
  }

  // Update itemCount and subTotal
  const itemCount = items.reduce(
    (sum: number, i: any) => sum + Number(i.quantity[0]),
    0
  );
  cart.itemCount = [String(itemCount)];
  const cartSubTotal = items.reduce(
    (sum: number, i: any) => sum + Number(i.subTotal[0]),
    0
  );
  cart.subTotal = [cartSubTotal.toFixed(2)];

  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.json({ success: true });
};

export const decreaseQuantity = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const XML_PATH = path.join(__dirname, "../xml/cart.xml");
  const xmlData = fs.readFileSync(XML_PATH, "utf-8");
  const json = await parseStringPromise(xmlData);

  const cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
  if (!cart) return;

  let items = cart.items[0].item;
  if (!Array.isArray(items)) items = [items];

  const item = items.find((i: any) => i.productId[0] === productId);
  if (item && Number(item.quantity[0]) > 1) {
    item.quantity[0] = String(Number(item.quantity[0]) - 1);
    item.subTotal[0] = (
      Number(item.price[0]) * Number(item.quantity[0]) +
      Number(item.shippingFee[0])
    ).toFixed(2);
  }

  // Update itemCount and subTotal
  const itemCount = items.reduce(
    (sum: number, i: any) => sum + Number(i.quantity[0]),
    0
  );
  cart.itemCount = [String(itemCount)];
  const cartSubTotal = items.reduce(
    (sum: number, i: any) => sum + Number(i.subTotal[0]),
    0
  );
  cart.subTotal = [cartSubTotal.toFixed(2)];

  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.json({ success: true });
};

export const updateShippingFee = async (req: Request, res: Response) => {
  const { userId, productId, shippingFee } = req.body;
  const XML_PATH = path.join(__dirname, "../xml/cart.xml");
  const xmlData = fs.readFileSync(XML_PATH, "utf-8");
  const json = await parseStringPromise(xmlData);

  const cart = json.carts.cart.find((c: any) => c.userId[0] === userId);
  if (!cart) return;

  let items = cart.items[0].item;
  if (!Array.isArray(items)) items = [items];

  const item = items.find((i: any) => i.productId[0] === productId);
  if (item) {
    item.shippingFee[0] = shippingFee;
  }

  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.json({ success: true });
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const XML_PATH = path.join(__dirname, "../xml/cart.xml");
  const xmlData = fs.readFileSync(XML_PATH, "utf-8");
  const json = await parseStringPromise(xmlData);

  // Find the user's cart
  const cartIndex = json.carts.cart.findIndex(
    (c: any) => c.userId[0] === userId
  );
  if (cartIndex === -1) return;

  let cart = json.carts.cart[cartIndex];
  let items = cart.items[0].item;
  if (!Array.isArray(items)) items = [items];

  // Remove the item
  items = items.filter((i: any) => i.productId[0] !== productId);

  if (items.length === 0) {
    // Remove the whole cart if no items left
    json.carts.cart.splice(cartIndex, 1);
  } else {
    // Otherwise, update the cart's items, itemCount, and subTotal
    cart.items[0].item = items;
    cart.itemCount = [
      String(
        items.reduce((sum: number, i: any) => sum + Number(i.quantity[0]), 0)
      ),
    ];
    cart.subTotal = [
      items
        .reduce((sum: number, i: any) => sum + Number(i.subTotal[0]), 0)
        .toFixed(2),
    ];
  }

  const builder = new Builder();
  const updatedXml = builder.buildObject(json);
  fs.writeFileSync(XML_PATH, updatedXml);

  res.json({ success: true });
};
