import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const signup = (req: Request, res: Response) => {
  const { fullName, email } = req.body;

  const XML_DIR = path.join(__dirname, '../xml');
  const XML_PATH = path.join(XML_DIR, 'users.xml');

  const newUserXml = `
  <user>
    <fullName>${fullName}</fullName>
    <email>${email}</email>
  </user>`;

  // Check if xml file exist
  if (fs.existsSync(XML_PATH)) {
    const usersXml = fs.readFileSync(XML_PATH, 'utf-8');

    // Append the new user at the end of the existing XML content
    const updatedXml = usersXml.replace(
      '</users>',
      `${newUserXml}\n</users>`
    );

    // Write the updated XML content back to the file
    fs.writeFileSync(XML_PATH, updatedXml);
  } else {
    // Create a new XML file with the <users> root tag
    const initialXml = `<users>${newUserXml}</users>`;
    fs.writeFileSync(XML_PATH, initialXml);
  }

  res.status(200).json(
    { message: 'User successfully added to the XML file.' }
  );
}