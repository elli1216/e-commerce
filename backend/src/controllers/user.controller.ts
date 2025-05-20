import { Request, Response } from "express";
import path from "path";
import { readAndParseXml } from "../utils/parser";
import fs from "fs";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const XML_PATH = path.join(__dirname, "../xml/users.xml");
  try {
    const users = await readAndParseXml(XML_PATH);
    res.status(200).json(users);
  } catch (err: unknown) {
    res.status(500).json({ message: "Failed to read or parse users.xml" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const XML_PATH = path.join(__dirname, "../xml/users.xml");
  try {
    const users = await readAndParseXml(XML_PATH);
    const user = users.find((user: any) => user.id === id);
    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ message: "Failed to read or parse users.xml" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const XML_PATH = path.join(__dirname, "../xml/users.xml");
  try {
    const users = await readAndParseXml(XML_PATH);

    const userRegex = new RegExp(
      `<user>\\s*<id>${id}</id>[\\s\\S]*?</user>`,
      "gm"
    );

    if (!userRegex.test(users)) {
      return res.status(404).json({ message: "User not found" });
    }

    userRegex.lastIndex = 0;

    const updatedUsers = users.replace(userRegex, "");

    fs.writeFileSync(XML_PATH, updatedUsers);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: unknown) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

