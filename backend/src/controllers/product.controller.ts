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

export const getProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const XML_PATH = path.join(__dirname, "../xml/products.xml");

  try {
    const products = await readAndParseXml(XML_PATH);
    const response = products.product.find((p: any) => p.id === id);

    if (!response) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(response);
  } catch (err: unknown) {
    console.error("Error getting product:", err);
    res.status(500).json({
      message: "Failed to read or parse products.xml" + err,
    });
  }
};

export const addProduct = async (req: Request, res: Response): Promise<any> => {
  const {
    category,
    productImage,
    productBrand,
    productName,
    productPrice,
    productStock,
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
    <productBrand>${productBrand}</productBrand>
    <productName>${productName}</productName>
    <productPrice>${productPrice}</productPrice>
    <productStock>${productStock}</productStock>
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
        <limitedEdition>${
          productTags.miscellaneous.limitedEdition
        }</limitedEdition>
        <ecoFriendly>${productTags.miscellaneous.ecoFriendly}</ecoFriendly>
        <energyEfficient>${
          productTags.miscellaneous.energyEfficient
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

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    category,
    productImage,
    productBrand,
    productName,
    productPrice,
    productStock,
    productDescription,
    productTags,
  } = req.body;
  const { id } = req.params;

  const XML_PATH = path.join(__dirname, "../xml/products.xml");

  const productsXml = fs.readFileSync(XML_PATH).toString();

  const imageFolder = path.join(__dirname, "../images");
  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
  }

  const products = await readAndParseXml(XML_PATH);
  const product = products.product.find((p: any) => p.id === id);
  const imgData = productImage?.replace(/^data:image\/\w+;base64,/, "");
  let imageFileName;

  if (imgData && imgData.length > 0) {
    // If there's new image data, save it with a new filename
    imageFileName = `${productName.replace(/\s+/g, "-")}-${Date.now()}.jpg`;
    const imageFilePath = path.join(imageFolder, imageFileName);
    fs.writeFileSync(imageFilePath, Buffer.from(imgData, "base64"));
  } else if (product && product.productImage) {
    // If no new image, use the existing one
    imageFileName = product.productImage;
  } else {
    // Fallback to a default name if no image exists
    imageFileName = `default-${Date.now()}.jpg`;
  }

  const updatedProductXml = `
  <product>
  <id>${id}</id>
  <category>${category}</category>
  <productImage>${imageFileName}</productImage>
  <productName>${productName}</productName>
  <productBrand>${productBrand}</productBrand>
  <productPrice>${productPrice}</productPrice>
  <productStock>${productStock}</productStock>
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
      <limitedEdition>${productTags.miscellaneous.limitedEdition}</limitedEdition>
      <ecoFriendly>${productTags.miscellaneous.ecoFriendly}</ecoFriendly>
      <energyEfficient>${productTags.miscellaneous.energyEfficient}</energyEfficient>
    </miscellaneous>
  </tags>
</product>
  `;
  try {
    // Create a regex pattern that will match the entire product XML block with the given ID
    // Using RegExp constructor to create a dynamic regex pattern with proper flags
    const productRegex = new RegExp(
      `<product>\\s*<id>${id}</id>[\\s\\S]*?</product>`,
      "gm"
    );

    // Check if the product exists in the XML
    if (!productRegex.test(productsXml)) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Reset the lastIndex property of the regex
    productRegex.lastIndex = 0;

    // Replace the old product with the updated one
    const updatedXML = productsXml.replace(
      productRegex,
      updatedProductXml.trim()
    );

    fs.writeFileSync(XML_PATH, updatedXML);

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product." });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const XML_PATH = path.join(__dirname, "../xml/products.xml");

  try {
    const productsXml = fs.readFileSync(XML_PATH).toString();

    // Create a regex pattern that matches the entire product XML block with the given ID
    const productRegex = new RegExp(
      `<product>\\s*<id>${id}</id>[\\s\\S]*?</product>`,
      "gm"
    );

    // Check if the product exists
    if (!productRegex.test(productsXml)) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Reset the lastIndex property of the regex
    productRegex.lastIndex = 0;

    // Remove the product from the XML
    const updatedXML = productsXml.replace(productRegex, "");

    // Clean up any double newlines created by the deletion
    const cleanedXML = updatedXML.replace(/\n\s*\n/g, "\n");

    fs.writeFileSync(XML_PATH, cleanedXML);

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product." });
  }
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
