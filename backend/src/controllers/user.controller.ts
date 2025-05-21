import { Request, Response } from "express";
import path from "path";
import { readAndParseXml } from "../utils/parser";
import fs, { readFileSync } from "fs";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const XML_PATH = path.join(__dirname, "../xml/users.xml");
  try {
    const users = await readAndParseXml(XML_PATH);
    res.status(200).json(users);
  } catch (err: unknown) {
    res.status(500).json({ message: "Failed to read or parse users.xml" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const XML_PATH = path.join(__dirname, "../xml/users.xml");
  try {
    const users = await readAndParseXml(XML_PATH);
    const user = users.user.find((user: any) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ message: "Failed to read or parse users.xml" });
  }
};

//have errors, but works fine
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const XML_PATH = path.join(__dirname, "../xml/users.xml");

  try {
    // Read the XML file as a string
    const xmlString = fs.readFileSync(XML_PATH, "utf-8");

    // Parse the XML to get the users object
    const users = await readAndParseXml(XML_PATH);

    // Check if users is an array
    if (!Array.isArray(users.user)) {
      // If there's only one user, create an array with that user
      users.user = [users.user];
    }

    // Find the user with the specified ID
    const userIndex = users.user.findIndex((user: any) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the array
    users.user.splice(userIndex, 1);

    // Convert the modified users object back to XML
    const builder = new (require("xml2js").Builder)({
      xmldec: { version: "1.0", encoding: "UTF-8" },
      renderOpts: { pretty: true, indent: "  " },
    });

    // Wrap the users array in a root element
    const updatedXml = builder.buildObject({ users: users });

    // Write the XML back to the file
    fs.writeFileSync(XML_PATH, updatedXml);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: unknown) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
