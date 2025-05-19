import { Request, Response } from "express";
import path from "path";
import { readAndParseXml } from "../utils/parser";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const getProducts = async (req: Request, res: Response) => {
  const XML_PATH = path.join(__dirname, "../xml/products.xml");
  try {
    const products = await readAndParseXml(XML_PATH);
    res.status(200).json(products);
  } catch (err: unknown) {
    res.status(500).json({
      message: "Failed to read or parse products.xml",
    });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const {
    category,
    productImage,
    productName,
    productPrice,
    productQuantity,
    productDescription,
    productTags,
  } = req.body;

  const XML_PATH = path.join(__dirname, "../xml/products.xml");

  const productsXml = fs.readFileSync(XML_PATH).toString();
  const imageFolder = path.join(__dirname, "../images");
  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
  }
  const imageFileName = `${productName + Math.random()}.jpg`;
  const imageFilePath = path.join(imageFolder, imageFileName);
  const data = productImage.replace(/^data:image\/\w+;base64,/, "");
  fs.writeFileSync(imageFilePath, Buffer.from(data, "base64"));

  const newProductXml = `
  <product>
    <id>${uuidv4()}</id>
    <category>${category}</category>
    <productImage>${imageFileName}</productImage>
    <productName>${productName}</productName>
    <productPrice>${productPrice}</productPrice>
    <productStock>${productQuantity}</productQuantity>
    <productDescription>${productDescription}</productDescription>
    <tags>
      <connectivity>
        <wifi>${productTags.connectivity.wifi}</wifi>
        <bluetooth>${productTags.connectivity.bluetooth}</bluetooth>
        <ethernet>${productTags.connectivity.ethernet}</ethernet>
        <usb3>${productTags.connectivity.usb3}</usb3>
        <thunderbolt>${productTags.connectivity.thunderbolt}</thunderbolt>
        <hdmi>${productTags.connectivity.hdmi}</hdmi>
      </connectivity>
      <usageBased>
        <gaming>${productTags.usageBased.gaming}</gaming>
        <office>${productTags.usageBased.office}</office>
        <programming>${productTags.usageBased.programming}</programming>
        <videoEditing>${productTags.usageBased.videoEditing}</videoEditing>
        <streaming>${productTags.usageBased.streaming}</streaming>
        <homeUse>${productTags.usageBased.homeUse}</homeUse>
        <business>${productTags.usageBased.business}</business>
        <student>${productTags.usageBased.student}</student>
      </usageBased>
      <features>
        <rgb>${productTags.features.rgb}</rgb>
        <mechanical>${productTags.features.mechanical}</mechanical>
        <backlit>${productTags.features.backlit}</backlit>
        <ergonomic>${productTags.features.ergonomic}</ergonomic>
        <portable>${productTags.features.portable}</portable>
        <silent>${productTags.features.silent}</silent>
      </features>
      <miscellaneous>
        <newArrival>${productTags.miscellaneous.newArrival}</newArrival>
        <limitedEdition>${productTags.miscellaneous.limitedEdition
    }</limitedEdition>
        <ecoFriendly>${productTags.miscellaneous.ecoFriendly}</ecoFriendly>
        <energyEfficient>${productTags.miscellaneous.energyEfficient
    }</energyEfficient>
      </miscellaneous>
    </tags>
  </product>`;

  const updatedXML = productsXml.replace(
    "</products>",
    `${newProductXml}\n</products>`
  );

  fs.writeFileSync(XML_PATH, updatedXML);

  res.status(201).json({ message: "Product added successfully." });
};

export const getCategories = async (req: Request, res: Response) => {
  const XML_PATH = path.join(__dirname, "../xml/categories.xml");
  try {
    const categories = await readAndParseXml(XML_PATH);
    res.status(200).json(categories);
  } catch (err: unknown) {
    res.status(500).json({
      message: "Failed to read or parse categories.xml",
    });
  }
};
