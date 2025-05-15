import * as fs from 'fs';
import { parseStringPromise } from 'xml2js';

export const readAndParseXml = async (xmlPath: string): Promise<string> => {
  const xmlData = await fs.promises.readFile(xmlPath, 'utf-8');
  const result = await parseStringPromise(
    xmlData,
    { explicitArray: false, explicitRoot: false }
  );

  return result;
}